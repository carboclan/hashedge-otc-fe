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
import { web3 } from '../../web3';
import moment from 'moment';
import { DialogEventBus } from './DialogContainer';
import PortfolioCard from './PortfolioCard';
import PortfolioDetail from './PortfolioDetail';

export default {
  name: 'PortfolioTable',
  props: ['title', 'data'],
  components: { PortfolioCard, PortfolioDetail },
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
      portfolios: [
      {
        id: 1,
        name: 'Bitcoin',
        code: 'BTC',
        hashType: 'POW',
        paid: 43.1602,
        pUnit: 'DAI',
        received: 0.12301231,
        rUnit: 'BTC',
        amount: 100,
        total: 90,
        start: '1551344647',
        estimateGain: '1.30%',
        type: 'Seller',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      },
      {
        id: 2,
        name: 'ETH',
        code: 'ETH',
        hashType: 'POW',
        paid: 13.1602,
        pUnit: 'DAI',
        received: 1.12301231,
        rUnit: 'ETH',
        amount: 10,
        total: 30,
        start: '1551344647',
        estimateGain: '2.73%',
        type: 'Buyer',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      },
      {
        id: 3,
        name: 'Bitcoin',
        code: 'BTC',
        hashType: 'POW',
        paid: 4563.1602,
        pUnit: 'DAI',
        received: 0.12301231,
        rUnit: 'BTC',
        amount: 1000,
        total: 180,
        start: '1551344647',
        estimateGain: '1.91%',
        type: 'Buyer',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      },
      {
        id: 4,
        name: 'Ether',
        code: 'ETH',
        hashType: 'POW',
        paid: 143.1602,
        pUnit: 'DAI',
        received: 7.12301231,
        rUnit: 'ETH',
        amount: 50,
        total: 180,
        start: '1550344647',
        estimateGain: '6.30%',
        type: 'Seller',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      },
      {
        id: 5,
        name: 'ETH',
        code: 'ETH',
        hashType: 'POW',
        paid: 13.1602,
        pUnit: 'DAI',
        received: 1.12301231,
        rUnit: 'ETH',
        amount: 10,
        total: 30,
        start: '1551344647',
        estimateGain: '2.73%',
        type: 'Buyer',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      },
      {
        id: 6,
        name: 'Bitcoin',
        code: 'BTC',
        hashType: 'POW',
        paid: 43.1602,
        pUnit: 'DAI',
        received: 0.12301231,
        rUnit: 'BTC',
        amount: 100,
        total: 90,
        start: '1551344647',
        estimateGain: '1.30%',
        type: 'Seller',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      },
      {
        id: 7,
        name: 'Bitcoin',
        code: 'BTC',
        hashType: 'POW',
        paid: 4563.1602,
        pUnit: 'DAI',
        received: 0.12301231,
        rUnit: 'BTC',
        amount: 1000,
        total: 180,
        start: '1556442247',
        estimateGain: '1.91%',
        type: 'Buyer',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      },
      {
        id: 8,
        name: 'Bitcoin',
        code: 'BTC',
        hashType: 'POW',
        paid: 43.1602,
        pUnit: 'DAI',
        received: 0.12301231,
        rUnit: 'BTC',
        amount: 100,
        total: 90,
        start: '1556442247',
        estimateGain: '1.30%',
        type: 'Seller',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      },
      {
        id: 9,
        name: 'ETH',
        code: 'ETH',
        hashType: 'POW',
        paid: 13.1602,
        pUnit: 'DAI',
        received: 1.12301231,
        rUnit: 'ETH',
        amount: 10,
        total: 30,
        start: '1556442247',
        estimateGain: '2.73%',
        type: 'Buyer',
        tx: 'SDLFHEOID2233334988773101223392837493931029334444'
      }
      ],
    };
  },
  computed: {
    filterPortfolioList: function () {
      let returnData = this.$data.portfolios;
      let tab = this.$data.tab
      if (tab == 'ONGOING') {
        returnData = returnData.filter(function (item) {
          console.log(item.start,moment().unix())
          return (Number(item.start) < moment().unix() && Number(item.start) + item.total*24*3600 > moment().unix())
        })
      }
      if (tab == 'LISTED') {
        returnData = returnData.filter(function (item) {
          return (Number(item.start) > moment().unix())
        })
      }
      if (tab == 'COMPLETED') {
        returnData = returnData.filter(function (item) {
          return (Number(item.start) + item.total*24*3600 < moment().unix())
        })
      }
      let hashType = this.$data.hashType;
      if (hashType != 'ALL' && hashType != '') {
        returnData = returnData.filter(function (item) {
          return item.hashType == hashType
        });
      }
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
