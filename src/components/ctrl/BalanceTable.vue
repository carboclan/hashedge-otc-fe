<template>
<div class="table-container">
  <div>
    <div class="header">
      <div class="header-menu" v-bind:class="{ active: tab === 1}" v-on:click="selectTab(1)">BALANCE</div>
      <div class="header-menu" v-bind:class="{ active: tab === 2}" v-on:click="selectTab(2)">COLLATERAL</div>
      <!-- <div class="header-menu">
        <select name="sortby" id="sortby">   
          <option value="1">BTC</option>
          <option value="2">DAI</option>
          <option value="3">USD</option>
        </select>
      </div> -->
    </div>
  </div>
  <div v-if="tab==1">
    <div class="balance" v-for="erc20 of erc20s" v-bind:key="erc20">
      <BalanceCard :erc20="erc20" />
    </div>
  </div>
  <div v-if="tab==2">
    <div class="balance" v-for="collateral of collaterals" v-bind:key="collateral">
      <CollateralCard :collateral="collateral" />
    </div>
  </div>
  <WithdrawDialog />
  <DepositDialog />
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { web3, hashedgeContracts } from '../../web3';
import WithdrawDialog from './WithdrawDialog';
import DepositDialog from './DepositDialog';
import BalanceCard from './BalanceCard';
import CollateralCard from './CollateralCard';

export default {
  name: 'BalanceTable',
  props: ['title', 'data'],
  components: { BalanceCard, CollateralCard, WithdrawDialog, DepositDialog },
  methods: {
    selectTab(tab) {
      this.$data.tab = tab;
    },
  },
  computed: {
    erc20s: function() {
      return Object.keys(hashedgeContracts.erc20Tokens)
    },
    collaterals: function() {
      return Object.keys(hashedgeContracts.collaterals)
    }
  },
  data() {
    return {
      tab: 1,
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
