<template>
<div class="table-container">
  <div>
    <div class="header">
      <div class="header-menu" v-bind:class="{ active: tab === 'ONGOING'}" v-on:click="selectTab('ONGOING')">ONGOING</div>
      <div class="header-menu" v-bind:class="{ active: tab === 'LISTED'}" v-on:click="selectTab('LISTED')">LISTED</div>
      <div class="header-menu" v-bind:class="{ active: tab === 'COMPLETED'}" v-on:click="selectTab('COMPLETED')">COMPLETED</div>
      <div class="header-menu">
        <select v-model="hashType">
          <option value="" selected disabled>HASH TYPE</option>
          <option value="ALL">ALL</option>
          <option value="POW">POW</option>
          <option value="POS">POS</option>
          <option value="DPOS">DPOS</option>
        </select>
      </div>
    </div>
  </div>
  <div>
    <div class="portfolio" v-for="portfolio of filterPortfolioList" v-bind:key="portfolio.id" v-bind:class="portfolio.hashType">
      <div v-on:click="selectPortfolio(portfolio)">
        <PortfolioCard :portfolio="portfolio" />
      </div>
    </div>
  </div>
  <PortfolioDetail :portfolio="selectedPortfolio" v-if="selectedPortfolio != null" />
</div>
</template>

<script>
import { web3, hashedgeContracts } from '../../web3';
import moment from 'moment';
import { DialogEventBus } from './DialogContainer';
import PortfolioCard from './PortfolioCard';
import PortfolioDetail from './PortfolioDetail';

export default {
  name: 'PortfolioTable',
  props: ['title', 'data'],
  components: { PortfolioCard, PortfolioDetail },
    mounted: async function () {
    const swapInfos = {}
    await Promise.all(Object.values(hashedgeContracts.swap721Tokens).map(async (token) => {
      const name = await token.name();
      const unit = await token.contractUnit();
      const type = await token.contractType();
      swapInfos[token.address] = {
        name, unit, type
      }
    }));
    const userAddress = web3.eth.accounts[0];
    const query = `http://localhost:3000/swap721/list/?owner=${userAddress}`;
    const list = await fetch(query).then(response => { return response.json() });
    const portfolioList = list.result.map((portfolio) => {
      return {
          id: portfolio.contractAddr + portfolio.id,
          name: swapInfos[portfolio.contractAddr].name,
          rUnit: swapInfos[portfolio.contractAddr].name.substr(0,3),
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
          received: 30123871310237122,
          paid: 44038330398330283,
          priceUSD: portfolio.price,
          contractSize: portfolio.contractSize,
          issuer: portfolio.issuer,
          payout: portfolio.fixLegPayoutPerDay,
          tx: '10a271e2c039123a812c07213e1231e0274ca141',
          type: portfolio.issuer === userAddress ? 'Seller' : 'Buyer',
      }
    });
    this.$data.portfolios = portfolioList;
  },
  methods: {
    selectTab(tab) {
      this.$data.tab = tab;
      this.$data.selectedPortfolio = null;
    },
    selectPortfolio(portfolio) {
      this.$data.selectedPortfolio = portfolio;
    },
    showCreatDialog() {
      DialogEventBus.$emit('show-create-dialog');
    },
    showTradeDialog(token) {
      DialogEventBus.$emit('show-trade-dialog', token);
    }
  },
  data() {
    return {
      tab: 'ONGOING',
      hashType: '',
      selectedPortfolio: null,
      portfolios: [],
    };
  },
  computed: {
    filterPortfolioList: function () {
      let returnData = this.$data.portfolios;
      let tab = this.$data.tab
      if (tab == 'ONGOING') {
        returnData = returnData.filter(function (item) {
          return (item.status === 1);
        })
      }
      if (tab == 'LISTED') {
        returnData = returnData.filter(function (item) {
          return (item.status === 0);
        })
      }
      if (tab == 'COMPLETED') {
        returnData = returnData.filter(function (item) {
          return (item.status === 1);
        })
      }
      // let hashType = this.$data.hashType;
      // if (hashType != 'ALL' && hashType != '') {
      //   returnData = returnData.filter(function (item) {
      //     return item.hashType == hashType
      //   });
      // }
      return returnData
    }
  }
}
</script>

<style scoped lang="scss">
.table-container {
  background-color: #37474F;
  border-radius: 4px;
  color: #ECEFF1;
  width: 464px;
  padding-bottom: 1px;
  .header {
    height: 48px;
    background: #263238;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    .header-menu {
      color: #455A64;
      height: 48px;
      width: 25%;
      line-height: 48px;
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      font-variant: small-caps;
      &.active {
        border-bottom: 1px solid white;
        color: white;
      }
    }
  }
}
</style>
