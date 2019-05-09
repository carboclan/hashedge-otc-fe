<template>
<div class="table-container">
  <div>
    <div class="header">
      <!-- <select name="sortby" v-model="sortby">   
        <option value="1">PAYOUT</option>
        <option value="2">PERFORMANCE</option>
      </select> -->
      <div class="header-menu right-border">LAST 24 HOURS</div>
      <div class="header-menu">PAST 30 DAYS</div>
    </div>
    <div class="table-header">
      <div class="long">mining/staking payoff</div>
      <div>performance</div>
      <div class="right-border">net gain</div>
      <div>performance</div>
      <div>net gain</div>
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
import { web3 } from '../../web3';
import TokenCard from './TokenCard';

export default {
  name: 'TokenTable',
  props: ['title', 'data'],
  components: { TokenCard },
  methods: {
  },
  data() {
    return {
      sortby: '1',
    };
  },
  computed: {
    sortedTokenList: function () {
      var key = this.$data.sortby;
      var tokens = this.$store.state.erc20List;
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
  width: 638px;
  padding-bottom: 1px;
  .right-border {
    border-right: 0.5px solid #455A64;
  }
  .header {
    height: 48px;
    background: #263238;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    justify-content: flex-end;
    .header-menu {
      color: white;
      height: 48px;
      width: 164px;
      line-height: 48px;
      font-size: 14px;
      text-align: center;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      font-variant: small-caps;
    }
  }
  .table-header {
    background-color: #263238;
    font-size: 12px;
    line-height: 22px;
    color: #78909C;
    display: flex;
    justify-content: flex-end;
    >div {
      text-align: center;
      width: 82px;
      &.long {
        width: 210px;
      }
    }
  }
}
</style>
