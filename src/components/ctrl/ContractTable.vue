<template>
<div class="table-container">
  <div>
    <div class="header">
      <div class="header-menu" v-bind:class="{ active: tab === 'ALL'}" v-on:click="selectTab('ALL')">ALL</div>
      <div class="header-menu" v-bind:class="{ active: tab === 'AUCTION'}" v-on:click="selectTab('AUCTION')">AUCTION</div>
      <div class="header-menu" v-bind:class="{ active: tab === 'FIXED'}" v-on:click="selectTab('FIXED')">BUY IT NOW</div>
    </div>
    <div class="table-header">
        <select v-model="contractType">
          <option value="" selected>CONTRACT TYPE</option>
          <option value="BTC-POW">BTC-POW</option>
          <option value="ETH-POW">ETH-POW</option>
          <option value="EOS-POS">EOS-POS</option>
        </select>
        <!-- <select v-model="payoffCoin">
          <option value="" selected>PAYOUT CURRENCY</option>
        </select> -->
        <select v-model="payoffType">
          <option value="STD" selected>STANDARD PAYOFF</option>
          <option value="ACT">ACTUAL PAYOFF</option>
        </select>
        <select v-model="duration">
          <option value="" selected>DURATION</option>
          <option value="60">1 MINS</option>
          <option value="2592000">30 DAYS</option>
          <option value="7776000">90 DAYS</option>
          <option value="15552000">180 DAYS</option>
        </select>
    </div>
  </div>
  <div v-if="tab !== 'AUCTION'">
    <div class="contract" v-for="contract of filterContractList"  v-bind:key="contract.id" v-bind:class="contract.hashType">
      <div v-on:click="selectContract(contract)">
        <ContractCard :contract="contract"/>
      </div>
    </div>
    <div class="contract" v-show="filterContractList.length === 0">
      <div class="empty">No Contract Found</div>
    </div>
  </div>
  <div v-if="tab === 'AUCTION'">
    <div class="contract" v-for="order of orders"  v-bind:key="order.portfolio.id" v-bind:class="order.portfolio.hashType">
      <div>
        <AuctionCard :order="order"/>
      </div>
    </div>
    <div class="contract" v-show="orders.length === 0">
      <div class="empty">No Contract Found</div>
    </div>
  </div>
  <ContractDetail :contract="selectedContract" v-if="selectedContract != null" />
</div>
</template>

<script>
import AuctionCard from './AuctionCard';
import ContractCard from './ContractCard';
import ContractDetail from './ContractDetail';

export default {
  name: 'ContractTable',
  props: ['title', 'data'],
  components: { AuctionCard, ContractCard, ContractDetail },
  mounted: async function () {
    this.$store.dispatch('getContractList');
  },
  methods: {
    selectTab(tab) {
      this.$data.tab = tab;
      this.$data.selectedContract = null;
    },
    selectContract(contract) {
      this.$data.selectedContract = contract;
    },
  },
  data() {
    console.log(this.$store.state.orders);
    return {
      tab: 'ALL',
      selectedContract: null,
      duration: '',
      payoffType: 'STD',
      contractType: '',
      orders: this.$store.state.orders
    };
  },
  computed: {
    coinType: {
      get() {
        return this.$store.state.coinType;
      },
      set(val) {
        this.$store.commit('setCoinType', val);
      }
    },
    filterContractList: function () {
      let returnData = this.$store.state.contractList;
      let tab = this.$data.tab
      if (tab != 'ALL' && tab != '') {
        returnData = returnData.filter(function (item) {
          return item.pricingMethod == tab
        })
      }
      let coinType = this.$store.state.coinType;
      if (coinType != 'ALL' && coinType != '') {
        returnData = returnData.filter(function (item) {
          return item.code == coinType
        });
      }
      let duration = this.$data.duration;
      if (duration != 'ALL' && duration != '') {
        returnData = returnData.filter(function (item) {
          return item.duration == duration
        });
      }
      let payoffType = this.$data.payoffType;
      if (payoffType != 'ALL' && payoffType != '') {
        returnData = returnData.filter(function (item) {
          return item.payoffType == payoffType
        });
      }
      let contractType = this.$data.contractType;
      if (contractType != 'ALL' && contractType != '') {
        returnData = returnData.filter(function (item) {
          return item.name == contractType
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
  .table-header {
    background-color: #263238;
    font-size: 12px;
    padding: 0 8px;
    color: #455A64;
    border-top: 0.5px solid #455A64;
    display: flex;
    >select {
      border: none;
      border-radius: 0;
      border-right: 0.5px solid #455A64;
      min-width: 25%
    }
    >select:last-child {
      border-right: none;
    }
  }
  .empty {
    text-align: center;
    padding: 10px;
  }
}
</style>
