<template>
<div class="table-container">
  <div>
    <div class="header">
      <div class="header-menu" v-bind:class="{ active: tab === 1}" v-on:click="selectTab(1)">ALL</div>
      <div class="header-menu" v-bind:class="{ active: tab === 2}" v-on:click="selectTab(2)">AUCTION</div>
      <div class="header-menu" v-bind:class="{ active: tab === 3}" v-on:click="selectTab(3)">FIXED PRICE</div>
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
    <div class="contract" v-for="contract of contracts"  v-bind:key="contract.id" v-bind:class="contract.hashType">
      <div v-on:click="selectContract(contract)">
        <ContractCard :contract="contract"/>
      </div>
    </div>
  </div>
  <ContractDetail :contract="selectedContract" v-show="selectedContract != null" />
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { web3 } from '../../web3';
import { DialogEventBus } from './DialogContainer';
import ContractCard from './ContractCard';
import ContractDetail from './ContractDetail';

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
  name: 'ContractTable',
  props: ['title', 'data'],
  components: { ContractCard, ContractDetail },
  methods: {
    selectTab(tab) {
      this.$data.tab = tab;
      this.$data.selectedContract = null;
    },
    selectContract(contract) {
      this.$data.selectedContract = contract;
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
      selectedContract: null,
      contracts: [{
        id: 1,
        name: 'Bitcoin',
        code: 'BTC',
        hashType: 'POW',
        priceUSD: 0.1602,
        unit: 'TH',
        priceBTC: 0.00004101,
        rating: '☆☆☆☆☆',
        hoursLeft: '15:30',
        shareSold: 1000,
        shareTotal: 2500,
        payoutType: 'Standard Payout'
      },
      {
        id: 2,
        name: 'Ether',
        code: 'ETH',
        hashType: 'POW',
        priceUSD: 0.0302,
        unit: 'GH',
        priceBTC: 0.00001281,
        rating: '☆☆☆☆',
        hoursLeft: '100:45',
        shareSold: 450,
        shareTotal: 500,
        payoutType: 'Standard Payout'
      },
      {
        id: 3,
        name: 'Bitcoin',
        code: 'BTC',
        hashType: 'POW',
        priceUSD: 0.1701,
        unit: 'TH',
        priceBTC: 0.00004322,
        rating: '☆☆☆☆☆',
        hoursLeft: '75:30',
        shareSold: 1500,
        shareTotal: 2500,
        payoutType: 'Standard Payout'
      },
      {
        id: 4,
        name: 'Ether',
        code: 'ETH',
        hashType: 'POW',
        priceUSD: 0.0411,
        unit: 'GH',
        priceBTC: 0.00002881,
        rating: '☆☆☆',
        hoursLeft: '100:45',
        shareSold: 150,
        shareTotal: 500,
        payoutType: 'Standard Payout'
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
