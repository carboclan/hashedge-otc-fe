import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'co-lodash';
import config from '../config';
import { web3, hashedgeContracts } from '../web3';
import moment from 'moment';
import contracts from './contracts';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    contracts
  },
  state: {
    metamaskState: 0,
    erc20List: [],
    contractList: [],
    contractListProps: {
      total: 0,
      loaded: 0
    },
    portfolioList: [],
    rateMap: {
      ETH: 162.02,
      WETH: 162.02,
      BTC: 5072.63,
      WBTC: 5072.63,
      DAI: 1,
      EOS: 5.39
    },
    dialog: {
      name: '',
      show: false,
      params: '',
    },
    swapInfos: null,
    coinType: 'ALL',
  },
  mutations: {
    setCoinType (state, payload) {
      state.coinType = payload;
    },
    showDialog (state, payload) {
      state.dialog = payload
    },
    hideDialog (state) {
      state.dialog = {
        name: '',
        show: false,
        params: {}
      }
    },
    setErc20List (state, payload) {
      state.erc20List = payload
    },
    setContractList (state, payload) {
      state.contractList = payload
    },
    setContractListProps (state, payload) {
      state.contractListProps = payload
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
      // ctx.commit('setErc20List', moke);
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
      const query = `${config.apiConfig}swap721/list/?agg=1`
      const list = await fetch(query).then(response => { return response.json() });
      const listProps = {
        total: list.total,
        loaded: list.result.length
      }
      ctx.commit('setContractListProps', listProps);
      const contractList = list.result.reduce((pre, next) => {
        const key = next.issueTx;
        if (pre[key]) {
          pre[key].shareTotal += next.ids.length;
          if (next.status === 0) {
            pre[key].avaliableShares = pre[key].avaliableShares.concat(next.ids);
          } else {
            pre[key].shareSold += next.ids.length;
          }
        } else {
          const code = swapInfos[next.contractAddr].name.substr(0,3);
          pre[key] = {
            id: key,
            name: swapInfos[next.contractAddr].name,
            code: code,
            hashType: swapInfos[next.contractAddr].type,
            address: next.contractAddr,
            payoffType: 'STD',
            duration: Number(moment(next.endTime).unix()) - Number(moment(next.startTime).unix()),
            pricingMethod: 'FIXED',
            rating: '☆☆☆☆☆',
            unit: swapInfos[next.contractAddr].unit,
            shareSold: next.status === 0 ? 0 : next.ids.length,
            avaliableShares: next.status === 0 ? next.ids : [],
            shareTotal: next.ids.length,
            contractSize: next.contractSize,
            priceUSD: next.price,
            priceCOIN: next.price / ctx.state.rateMap[code],
            issuer: next.issuer,
            tx: next.issueTx,
            payoff: tokenInfo[code].priceCOIN,
            payoffUSD: tokenInfo[code].priceUSD,
          }
        }
        return pre;
      }, {})
      const returnList = Object.values(contractList).filter(item => item.shareSold < item.shareTotal);
      ctx.commit('setContractList', returnList);
    },
    async loadMoreContract (ctx) {
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
      const query = `${config.apiConfig}swap721/list/?offset=${ctx.state.contractListProps.loaded}`
      const list = await fetch(query).then(response => { return response.json() });
      const listProps = {
        total: list.total,
        loaded: ctx.state.contractListProps.loaded + list.result.length
      }
      ctx.commit('setContractListProps', listProps);
      const contractList = list.result.reduce((pre, next) => {

        
        const key = next.issueTx;
        if (pre[key]) {
          pre[key].shareTotal += next.ids.length;
          if (next.status === 0) {
            pre[key].avaliableShares = pre[key].avaliableShares.concat(next.ids);
          } else {
            pre[key].shareSold += next.ids.length;
          }
        } else {
          const code = swapInfos[next.contractAddr].name.substr(0,3);
          pre[key] = {
            id: key,
            name: swapInfos[next.contractAddr].name,
            code: code,
            hashType: swapInfos[next.contractAddr].type,
            address: next.contractAddr,
            payoffType: 'STD',
            duration: Number(moment(next.endTime).unix()) - Number(moment(next.startTime).unix()),
            pricingMethod: 'FIXED',
            rating: '☆☆☆☆☆',
            unit: swapInfos[next.contractAddr].unit,
            shareSold: next.status === 0 ? 0 : next.ids.length,
            avaliableShares: next.status === 0 ? next.ids : [],
            shareTotal: next.ids.length,
            contractSize: next.contractSize,
            priceUSD: next.price,
            priceCOIN: next.price / ctx.state.rateMap[code],
            issuer: next.issuer,
            tx: next.issueTx,
            payoff: tokenInfo[code].priceCOIN,
            payoffUSD: tokenInfo[code].priceUSD,
          }
        }
        return pre;
      }, {})
      const appendList = Object.values(contractList).filter(item => item.shareSold < item.shareTotal);
      const returnList = appendList.concat(ctx.state.contractList);
      ctx.commit('setContractList', returnList);
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
      const portfolioList = list.result.reduce((pre, portfolio) => {
        const key = portfolio.issueTx + '_' + moment(portfolio.startTime).unix();
        if (pre[key]) {
          pre[key].shareTotal += 1;
          pre[key].received += portfolio.totalFloatingLegPaid;
          pre[key].paid += portfolio.totalFixLegPaid;
        } else {
          const code = swapInfos[portfolio.contractAddr].name.substr(0,3);
          pre[key] = {
            key: key,
            id: portfolio.id,
            name: swapInfos[portfolio.contractAddr].name,
            rUnit: code,
            pUnit: 'DAI',
            status: portfolio.status,
            hashType: swapInfos[portfolio.contractAddr].type,
            address: portfolio.contractAddr,
            payoffType: 'STD',
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
            payoff: portfolio.fixLegpayoffPerDay,
            tx: portfolio.issueTx,
            estimateNetGain: portfolio.totalFixLegPaid === 0 ? 0 : portfolio.totalFloatingLegPaid * tokenInfo[code].priceUSD * 100 / portfolio.totalFixLegPaid / tokenInfo[code].priceCOIN - 100,
            type: portfolio.issuer === userAddress ? 'Seller' : 'Buyer',
          }
        }
        return pre;
      }, {});
      ctx.commit('setPortfolioList', Object.values(portfolioList));
    },
    async getSwapInfos (ctx) {
      let swapInfos = {}
      if (!ctx.state.contracts.contracts) {
        await _.sleep(3000);
      }
      await Promise.all(Object.values(ctx.state.contracts.contracts.swap721Tokens).map(async (token) => {
        console.log(token);
        const name = await token.name.callAsync();
        const unit = await token.contractUnit.callAsync();
        const type = await token.contractType.callAsync();
        const code = name.substr(0,3);
        swapInfos[token.address] = {
          address: token.address,
          name, unit, type, code
        }
      }));
      ctx.commit('setSwapInfos', swapInfos);
      return swapInfos;
    }
  }
})
