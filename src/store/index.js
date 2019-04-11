import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import { web3, hashedgeContracts } from '../web3';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    erc20List: [],
    contractList: [],
    portfolioList: [],
    dialog: {

    },
    swapInfos: null
  },
  mutations: {
    setErc20List (state, payload) {
      state.erc20List = payload
    },
    setContractList (state, payload) {
      state.contractList = payload
    },
    setPortfolioList (state, payload) {
      state.portfolioList = payload
    },
    setSwapInfos (state, payload) {
      state.swapInfos = payload
    }
  },
  actions: {
    async getErc20List (ctx) {
      const query = `${config.apiConfig}erc20/info/`;
      const list = await fetch(query).then(response => { return response.json() });
      ctx.commit('setErc20List', list);
    },
    async getContractList (ctx) {
      // Get chain info
      let swapInfos = {}
      if (ctx.state.swapInfos) {
        swapInfos = ctx.state.swapInfos;
      } else {
        swapInfos = await ctx.dispatch('getSwapInfos');
      }
      // Get token info
      const tokenInfo = _.chain(ctx.state.erc20List)
        .map((token) => [token.code, token])
        .fromPairs()
        .value();
      // Get contract info
      const query = `${config.apiConfig}swap721/list/`
      const list = await fetch(query).then(response => { return response.json() });
      const contractList = list.result.reduce((pre, next) => {
        const key = next.issueTx;
        if (pre[key]) {
          pre[key].shareTotal += 1;
          if (next.status === 0) {
            pre[key].avaliableShares.push(next.id);
          } else {
            pre[key].shareSold += 1;
          }
        } else {
          const code = swapInfos[next.contractAddr].name.substr(0,3);
          pre[key] = {
            id: key,
            name: swapInfos[next.contractAddr].name,
            code: code,
            hashType: swapInfos[next.contractAddr].type,
            address: next.contractAddr,
            payoutType: 'Standard Payout',
            duration: Number(moment(next.endTime).unix()) - Number(moment(next.startTime).unix()),
            pricingMethod: 'FIXED',
            rating: '☆☆☆☆☆',
            unit: swapInfos[next.contractAddr].unit,
            shareSold: next.status === 0 ? 0 : 1,
            avaliableShares: next.status === 0 ? [next.id] : [],
            shareTotal: 1,
            contractSize: next.contractSize,
            priceUSD: next.price,
            priceCOIN: next.price * tokenInfo[code].priceCOIN / tokenInfo[code].priceUSD,
            issuer: next.issuer,
            tx: next.issueTx,
            payout: tokenInfo[code].priceCOIN,
            payoutUSD: tokenInfo[code].priceUSD,
          }
        }
        return pre;
      }, {})
      const returnList = Object.values(contractList).filter(item => item.shareSold < item.shareTotal);
      ctx.commit('setContractList', Object.values(returnList));
    },
    async getPortfolioList (ctx) {
      // Get swap info
      let swapInfos = {}
      if (ctx.state.swapInfos) {
        swapInfos = ctx.state.swapInfos;
      } else {
        swapInfos = await ctx.dispatch('getSwapInfos');
      }
      // Get token info
      const tokenInfo = _.chain(ctx.state.erc20List)
        .map((token) => [token.code, token])
        .fromPairs()
        .value();
      //Get Contract Info
      const userAddress = web3.eth.accounts[0];
      const query2 = `${config.apiConfig}swap721/list/?owner=${userAddress}`;
      const list = await fetch(query2).then(response => { return response.json() });
      const portfolioList = list.result.map((portfolio) => {
        const code = swapInfos[portfolio.contractAddr].name.substr(0,3);
        return {
            key: portfolio.contractAddr + portfolio.id,
            id: portfolio.id,
            name: swapInfos[portfolio.contractAddr].name,
            rUnit: code,
            pUnit: 'DAI',
            status: portfolio.status,
            hashType: swapInfos[portfolio.contractAddr].type,
            address: portfolio.contractAddr,
            payoutType: 'Standard Payout',
            startTime: Number(moment(portfolio.startTime).unix()),
            endTime: Number(moment(portfolio.endTime).unix()),
            duration: Number(moment(portfolio.endTime).unix()) - Number(moment(portfolio.startTime).unix()),
            unit: swapInfos[portfolio.contractAddr].unit,
            shareTotal: 1,
            received: portfolio.totalFloatingLegPaid,
            paid: portfolio.totalFixLegPaid,
            priceUSD: portfolio.price,
            contractSize: portfolio.contractSize,
            issuer: portfolio.issuer,
            payout: portfolio.fixLegPayoutPerDay,
            tx: portfolio.issueTx,
            estimateNetGain: portfolio.totalFixLegPaid === 0 ? 0 : portfolio.totalFloatingLegPaid * tokenInfo[code].priceUSD * 100 / portfolio.totalFixLegPaid / tokenInfo[code].priceCOIN - 100,
            type: portfolio.issuer === userAddress ? 'Seller' : 'Buyer',
        }
      });
      ctx.commit('setPortfolioList', portfolioList);
    },
    async getSwapInfos (ctx) {
      let swapInfos = {}
      await Promise.all(Object.values(hashedgeContracts.swap721Tokens).map(async (token) => {
        const name = await token.name();
        const unit = await token.contractUnit();
        const type = await token.contractType();
        swapInfos[token.address] = {
          address: token.address,
          name, unit, type
        }
      }));
      ctx.commit('setSwapInfos', swapInfos);
      return swapInfos;
    }
  }
})
