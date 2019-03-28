<template>
<div class="table-container">
  <div>
    <div class="header">
      <div class="header-menu">
        <select name="sortby" v-model="sortby">   
          <option value="1">PAYOUT</option>
          <option value="2">PERFORMANCE</option>
        </select>
      </div>
    </div>
    <div class="table-header">
      <div>PAYOUT(LAST 24 HOURS)</div>
      <div>PERFORMANCE(LAST 24 HOURS)</div>
    </div>
  </div>
  <div>
    <div class="token" v-for="token of sortedTokenList" v-bind:key="token.name">
      <TokenCard :token="token" />
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { web3 } from '../../web3';
import { DialogEventBus } from './DialogContainer';
import TokenCard from './TokenCard';

Vue.filter('formatDate', function(value, format) {
  format = format || 'MM/DD/YYYY';

  if (value) {
    return moment(String(value)).forma(format);
  }
});

Vue.filter('percent', function (value) {
  return (value > 0 ? '+ ' : ' ') + value.toFixed(2) + '%';
});

export default {
  name: 'TokenTable',
  props: ['title', 'data'],
  components: { TokenCard },
  methods: {
    showCreatDialog() {
      DialogEventBus.$emit('show-create-dialog');
    }
  },
  data() {
    return {
      sortby: '1',
      tokens: [{
        name: 'Bitcoin',
        code: 'BTC',
        hashType: 'POW',
        priceUSD: 0.1638623,
        unit: 'TH',
        priceCOIN: 0.00004101,
        profitRate: 0.147
      },
      {
        name: 'Ether',
        code: 'ETH',
        hashType: 'POW',
        priceUSD: 0.012569375,
        unit: 'GH',
        priceCOIN: 0.00001281,
        profitRate: 1.767
      },
      {
        name: 'ZCASH',
        code: 'ZEC',
        hashType: 'POW',
        priceUSD: 0.1119127249,
        unit: 'KSOL',
        priceCOIN: 0.082028210,
        profitRate: 4.357
      },
            {
        name: 'LiteCoin',
        code: 'LTC',
        hashType: 'POW',
        priceUSD: 0.00323722046,
        unit: 'MH',
        priceCOIN: 0.000028210,
        profitRate: -0.204
      },
      {
        name: 'TEZOS',
        code: 'XZT',
        hashType: 'POS',
        priceUSD: -0.002309351417,
        unit: 'XZT',
        priceCOIN: -0.082028210,
        profitRate: -0.513
      },
      {
        name: 'EOS',
        code: 'EOS',
        hashType: 'DPOS',
        priceUSD: 0.0001181918,
        unit: 'EOS',
        priceCOIN: 0.0000273973 ,
        profitRate: 15.258
      }]
    };
  },
  computed: {
    sortedTokenList: function () {
      var key = this.$data.sortby;
      var tokens = this.$data.tokens;
      if (key == '1') {
        return tokens.sort(function (item1, item2) {
          if (item1.priceUSD > item2.priceUSD ) {
            return -1
          }
          return 1
        });
      } else if (key == '2') {
        return tokens.sort(function (item1, item2) {
          if (item1.profitRate > item2.profitRate ) {
            return -1
          }
          return 1
        });
      } else {
        return tokens;
      }
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
    justify-content: flex-end;
    .header-menu {
      color: #455A64;
      padding: 0 12px;
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
    padding: 4px 8px;
    color: #455A64;
    border-top: 0.5px solid #455A64;
    display: flex;
    justify-content: flex-end;
    >div {
      margin-left: 24px;
    }
  }
}
</style>
