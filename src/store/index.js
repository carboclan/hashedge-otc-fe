import Vue from 'vue';
import Vuex from 'vuex';
import config from '../config';
import { web3, hashedgeContracts } from '../web3';
import moment from 'moment';

Vue.use(Vuex);

const moke = [
  {
    "name": "Bitcoin",
    "code": "BTC",
    "hashType": "POW",
    "usdPayoff": 285392231000000000,
    "unit": "TH",
    "coinPayoff": 33710000000000,
    "profitRate": 0.147,
    "dailyPerformance": 0.005,
    "dailyNetGain": 0.002,
    "monthlyPerformance": 0.16,
    "monthlyNetGain": 0.08,
    "exchangePrice": 8466.1,
    "priceCOIN": 33710000000000,
    "priceUSD": 285392231000000000
  },
  {
    "name": "Ether",
    "code": "ETH",
    "hashType": "POW",
    "usdPayoff": 18226203600000000,
    "unit": "GH",
    "coinPayoff": 70090000000000,
    "profitRate": 1.767,
    "dailyPerformance": 0.004,
    "dailyNetGain": 0.003,
    "monthlyPerformance": 0.19,
    "monthlyNetGain": 0.05,
    "exchangePrice": 260.04,
    "priceCOIN": 70090000000000,
    "priceUSD": 18226203600000000
  },
  {
    "name": "ZCASH",
    "code": "ZEC",
    "hashType": "POW",
    "usdPayoff": 7033919007500000000,
    "unit": "KSOL",
    "coinPayoff": 82028210000000000,
    "profitRate": 4.357,
    "dailyPerformance": -0.001,
    "dailyNetGain": -0.002,
    "monthlyPerformance": 0.04,
    "monthlyNetGain": 0.03,
    "exchangePrice": 85.75,
    "priceCOIN": 82028210000000000,
    "priceUSD": 7033919007500000000
  },
  {
    "name": "LiteCoin",
    "code": "LTC",
    "hashType": "POW",
    "usdPayoff": 3622819200000000000,
    "unit": "GH",
    "coinPayoff": 32480000000000000,
    "profitRate": -0.204,
    "dailyPerformance": 0.001,
    "dailyNetGain": 0.0005,
    "monthlyPerformance": 0.11,
    "monthlyNetGain": 0.05,
    "exchangePrice": 111.54,
    "priceCOIN": 32480000000000000,
    "priceUSD": 3622819200000000000
  },
  {
    "name": "TEZOS",
    "code": "XZT",
    "hashType": "POS",
    "usdPayoff": -2309351417000000,
    "unit": "XZT",
    "coinPayoff": -82028210000000000,
    "profitRate": -0.513,
    "dailyPerformance": -0.005,
    "dailyNetGain": -0.002,
    "monthlyPerformance": -0.01,
    "monthlyNetGain": -0.01,
    "priceCOIN": -82028210000000000,
    "priceUSD": -2309351417000000
  },
  {
    "name": "EOS",
    "code": "EOS",
    "hashType": "DPOS",
    "usdPayoff": 199471522110000,
    "unit": "EOS",
    "coinPayoff": 27397300000000,
    "profitRate": 15.258,
    "dailyPerformance": 0.004,
    "dailyNetGain": 0.003,
    "monthlyPerformance": 0.17,
    "monthlyNetGain": 0.1,
    "exchangePrice": 7.2807,
    "priceCOIN": 27397300000000,
    "priceUSD": 199471522110000
  }
]
export default new Vuex.Store({
  state: {
    metamaskState: 0,
    erc20List: [],
    contractList: [],
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
      // ctx.commit('setErc20List', list);
      ctx.commit('setErc20List', moke);
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
            payoffType: 'STD',
            duration: Number(moment(next.endTime).unix()) - Number(moment(next.startTime).unix()),
            pricingMethod: 'FIXED',
            rating: '☆☆☆☆☆',
            unit: swapInfos[next.contractAddr].unit,
            shareSold: next.status === 0 ? 0 : 1,
            avaliableShares: next.status === 0 ? [next.id] : [],
            shareTotal: 1,
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
      await Promise.all(Object.values(hashedgeContracts.swap721Tokens).map(async (token) => {
        const name = await token.name();
        const unit = await token.contractUnit();
        const type = await token.contractType();
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
