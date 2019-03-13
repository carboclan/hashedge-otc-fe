<template>
<div class="table-container">
  <div>
    <div class="header">
      <div class="header-menu" v-bind:class="{ active: tab === 1}" v-on:click="selectTab(1)">BALANCE</div>
      <div class="header-menu" v-bind:class="{ active: tab === 2}" v-on:click="selectTab(2)">COLLATERAL</div>
      <div class="header-menu">
        <select name="sortby" id="sortby">   
          <option value="1">BTC</option>
          <option value="2">DAI</option>
          <option value="3">USD</option>
        </select>
      </div>
    </div>
  </div>
  <div>
    <div class="balance" v-for="balance of balances" v-bind:key="balance.name" v-bind:class="balance.hashType">
      <BalanceCard balance="balance" />
    </div>
  </div>
  <WithdrawDialog />
  <DepositDialog />
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { web3 } from '../../web3';
import WithdrawDialog from './WithdrawDialog';
import DepositDialog from './DepositDialog';
import BalanceCard from './BalanceCard';

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
  name: 'BalanceTable',
  props: ['title', 'data'],
  components: { BalanceCard, WithdrawDialog, DepositDialog },
  methods: {
    selectTab(tab) {
      this.$data.tab = tab;
    },
  },
  data() {
    return {
      tab: 1,
      balances: [{
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
