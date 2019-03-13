<template>
<div class="table-container">
  <div>
    <div class="header">
      <div class="header-menu" v-bind:class="{ active: tab === 1}" v-on:click="selectTab(1)">ONGOING</div>
      <div class="header-menu" v-bind:class="{ active: tab === 2}" v-on:click="selectTab(2)">LISTED</div>
      <div class="header-menu" v-bind:class="{ active: tab === 3}" v-on:click="selectTab(3)">COMPLETED</div>
      <div class="header-menu">
        <select name="sortby" id="sortby">   
          <option value="1">hash type</option>
          <option value="2">return</option>
          <option value="3">rating</option>
        </select>
      </div>
    </div>
  </div>
  <div>
    <div class="portfolio" v-for="portfolio of portfolios" v-bind:key="portfolio.name" v-bind:class="portfolio.hashType">
      <div v-on:click="selectPortfolio(portfolio)">
        <PortfolioCard portfolio="portfolio" />
      </div>
    </div>
  </div>
  <PortfolioDetail portfolio="portfolio" v-show="selectedPortfolio != null" />
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { web3 } from '../../web3';
import { DialogEventBus } from './DialogContainer';
import PortfolioCard from './PortfolioCard';
import PortfolioDetail from './PortfolioDetail';

Vue.filter('formatDate', function(value, format) {
  format = format || 'MM/DD/YYYY';

  if (value) {
    return moment(String(value)).forma(format);
  }
});

Vue.filter('eth', function (value, opt) {
  opt = opt || {};
  return (!opt.hideEth && 'Ξ ' || '') + web3.fromWei(value).toNumber().toFixed(opt.decimals || 5);
});

Vue.filter('bn', function (value) {
  return value.toNumber();
});

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
      tab: 1,
      selectedPortfolio: null,
      portfolios: [{
        name: 'Bitcoin',
        hashType: 'POW'
      },
      {
        name: 'ETH',
        hashType: 'POW'
      }]
    };
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
