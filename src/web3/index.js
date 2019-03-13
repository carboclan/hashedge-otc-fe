import { web3 } from 'web3-api-wrap';
const abi = require('./abi.json');
const hashedgeFactory = web3.loadContract(abi.hashedgeFactory, '0x345ca3e014aaf5dca488057592ee47305d9b3e10');

export { web3, abi, hashedgeFactory };

export async function listExchanges(filter) {
  const cnt = (await hashedgeFactory.getExchangeCount()).toNumber();
  const ret = [];
  for (let i = 0; i < cnt; i++) {
    const tokenAddr = await hashedgeFactory.tokenList(i);
    const token = web3.loadContract(abi.hashRateOptionsToken, tokenAddr);
    const xhgAddr = await hashedgeFactory.tokenToExchangeLookup(tokenAddr);
    const exchange = await web3.loadContract(abi.uniswapExchange, xhgAddr);
    console.log(xhgAddr, exchange.target, exchange.balanceOf);

    if (!filter || filter(xhg)) ret.push({
      token,
      exchange,
      name: await token.name(),
      symbol: await token.symbol(),
      totalSupply: await token.totalSupply(),
      target: await exchange.target(),
      startTs: await token.startTs(),
      endTs: await token.endTs(),
      hashType: await token.hashType(),
      hashRateUnit: await token.hashRateUnit(),
      tokenSize: await token.tokenSize()
    });
  }

  return ret;
}
