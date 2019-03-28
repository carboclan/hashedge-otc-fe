<template>
<div class="table-container">
  <div>
    <div class="header">
      <div class="header-menu" v-bind:class="{ active: tab === 'ALL'}" v-on:click="selectTab('ALL')">ALL</div>
      <div class="header-menu" v-bind:class="{ active: tab === 'AUCTION'}" v-on:click="selectTab('AUCTION')">AUCTION</div>
      <div class="header-menu" v-bind:class="{ active: tab === 'FIXED'}" v-on:click="selectTab('FIXED')">FIXED PRICE</div>
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
    <div class="table-header">
        <select v-model="coinType">
          <option value="" selected disabled>COIN</option>
          <option value="ALL">ALL</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="EOS">EOS</option>
        </select>
        <select v-model="payoutCoin">   
          <option value="" selected disabled>PAYOUT CURRENCY</option>
          <option value="ALL">ALL</option>
        </select>
        <select v-model="contractType">   
          <option value="" selected disabled>CONTRACT TYPE</option>
          <option value="ALL">ALL</option>
        </select>
        <select v-model="duration">   
          <option value="" selected disabled>DURATION</option>
          <option value="ALL">ALL</option>
          <option value="30">30 DAYS</option>
          <option value="90">90 DAYS</option>
          <option value="180">180 DAYS</option>
        </select>
    </div>
  </div>
  <div>
    <div class="contract" v-for="contract of filterContractList"  v-bind:key="contract.id" v-bind:class="contract.hashType">
      <div v-on:click="selectContract(contract)">
        <ContractCard :contract="contract"/>
      </div>
    </div>
  </div>
  <ContractDetail :contract="selectedContract" v-if="selectedContract != null" />
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
      tab: 'ALL',
      selectedContract: null,
      hashType: '',
      coinType: '',
      duration: '',
      payoutCoin: '',
      contractType: '',
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
        duration: 30,
        payoutType: 'Standard Payout',
        pricingMethod: 'FIXED',
        address: '1231231212312313d2222302233322342'
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
        duration: 30,
        payoutType: 'Standard Payout',
        pricingMethod: 'FIXED',
        address: '1231231212312313d2222302233322342'
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
        duration: 180,
        payoutType: 'Standard Payout',
        pricingMethod: 'FIXED',
        address: '1231231212312313d2222302233322342'
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
        duration: 90,
        payoutType: 'Standard Payout',
        pricingMethod: 'FIXED',
        address: '1231231212312313d2222302233322342'
      }]
    };
  },
  computed: {
    filterContractList: function () {
      let returnData = this.$data.contracts;
      let tab = this.$data.tab
      if (tab != 'ALL' && tab != '') {
        returnData = returnData.filter(function (item) {
          return item.pricingMethod == tab
        })
      }
      let coinType = this.$data.coinType;
      if (coinType != 'ALL' && coinType != '') {
        returnData = returnData.filter(function (item) {
          return item.code == coinType
        });
      }
      let hashType = this.$data.hashType;
      if (hashType != 'ALL' && hashType != '') {
        returnData = returnData.filter(function (item) {
          return item.hashType == hashType
        });
      }
      let duration = this.$data.duration;
      if (duration != 'ALL' && duration != '') {
        returnData = returnData.filter(function (item) {
          return item.duration == duration
        });
      }
      let payoutCoin = this.$data.payoutCoin;
      if (payoutCoin != 'ALL' && payoutCoin != '') {
        returnData = returnData.filter(function (item) {
          return item.payoutCoin == payoutCoin
        });
      }
      let contractType = this.$data.contractType;
      if (contractType != 'ALL' && contractType != '') {
        returnData = returnData.filter(function (item) {
          return item.type == contractType
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
    justify-content: flex-end;
    >select {
      border: none;
      border-radius: 0;
      border-right: 0.5px solid #455A64;
    }
    >select:last-child {
      border-right: none;
    }
  }
}
</style>
