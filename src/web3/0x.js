import { Web3Wrapper } from '@0x/web3-wrapper';
import { BigNumber, ContractWrappers, generatePseudoRandomSalt, DutchAuctionWrapper, assetDataUtils, orderHashUtils } from '0x.js';
import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses';

export const UNLIMITED_ALLOWANCE_IN_BASE_UNITS = new BigNumber(2).pow(256).minus(1);

let networkId, accounts, web3Wrapper, contractAddresses, contractWrappers;
const exp = { };

const initPromise = (async function () {
  accounts = await window.ethereum.enable();

  web3Wrapper = new Web3Wrapper(window.ethereum);
  networkId = await web3Wrapper.getNetworkIdAsync();

  contractAddresses = getContractAddressesForNetworkOrThrow(networkId);
  contractWrappers = new ContractWrappers(web3Wrapper.getProvider(), { networkId, contractAddresses });

  Object.assign(exp, {
    networkId,
    accounts,
    defaultAccount: accounts[0],
    web3Wrapper,
    contractAddresses,
    contractWrappers
  });
})();

export async function waitForInit() {
  if (!exp.web3Wrapper || !exp.contractWrappers) {
    await initPromise;
  }
}

export async function createAuction(erc721, tokenId, erc20Address, price, duration) {
  const erc721MakerAssetData = assetDataUtils.encodeERC721AssetData(erc721.address, tokenId);
  const makerAssetData = DutchAuctionWrapper.encodeDutchAuctionAssetData(
    erc721MakerAssetData,
    Math.round(Date.now() / 1000 - 600),
    new BigNumber(price * 1e18)
  );

  const order = {
    senderAddress: '0x0000000000000000000000000000000000000000',
    salt: generatePseudoRandomSalt(),
    exchangeAddress: contractWrappers.exchange.address,
    makerAddress: accounts[0],
    // taker address or sender address should be set to the ducth auction contract
    takerAddress: contractWrappers.dutchAuction.address,
    makerAssetData,
    takerAssetData: assetDataUtils.encodeERC20AssetData(erc20Address),
    makerAssetAmount: 1,
    takerAssetAmount: 1,
    expirationTimeSeconds: Math.round(Date.now() / 1000 + duration),

    feeRecipientAddress: erc721.address,
    makerFee: 0,
    takerFee: 0
  };

  const erc721ProxyAddr = contractWrappers.erc721Proxy.address;
  if (!await erc721.isApprovedForAll(accounts[0], erc721ProxyAddr)) {
    await erc721.setApprovalForAll(erc721ProxyAddr, true);
  }

  const orderHashBuff = orderHashUtils.getOrderHashHex(order);
  const signature = await web3Wrapper.signMessageAsync(accounts[0], orderHashBuff);

  return {
    ...order,
    signature
  };
}

export async function bidAuction(auctionOrder, erc20) {
  const order = {
    ...auctionOrder,
    makerAddress: accounts[0],
    makerAssetData: auctionOrder.takerAssetData,
    takerAssetData: auctionOrder.makerAssetData
  };

  const allowance = await erc20.allowance(accounts[0], contractWrappers.erc20Proxy.address);
  if (allowance.eq(0)) {
    await erc20.approve(contractWrappers.erc20Proxy.address, UNLIMITED_ALLOWANCE_IN_BASE_UNITS.toString());
  }

  const orderHashBuff = orderHashUtils.getOrderHashHex(order);
  const signature = await web3Wrapper.signMessageAsync(accounts[0], orderHashBuff);
  order.signature = signature;

  console.log(order);
  const txHash = await contractWrappers.dutchAuction.matchOrdersAsync(
    order,
    auctionOrder,
    accounts[0],
    { shouldValidate: true }
  );

  const tx = await web3Wrapper.awaitTransactionSuccessAsync(txHash, 3000);
  // tx.logs = _.map(tx.logs, log => this.decodeLogOrThrow(log));
  return tx;
}

export default exp;
