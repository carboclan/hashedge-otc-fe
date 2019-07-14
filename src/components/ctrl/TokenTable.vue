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
      <div class="long">mining/staking payoff
        <el-tooltip class="help-mark" effect="dark">
          <div class="tip-content" slot="content">
            <div class="tip-title">
              =L24h Mining/Staking Output per Unit in USD
            </div>
            For POW token, say bitcoin, in the last 24 hours, <br/>
            one terahash produced an amount of bitcoin worth<br/>
            $0.3456<br/>
            <br/>
            For POS token, say Tezos, in the last 24 hours, <br/>
            one XTZ staked yielded an amount of XTZ worth<br/>
            $0.0001234
          </div>
          <i class="material-icons">help_circle</i>
        </el-tooltip>
      </div>
      <div>performance</div>
      <div class="right-border">net gain
        <el-tooltip class="help-mark" effect="dark">
          <div class="tip-content" slot="content">
            <div class="tip-title">
              Let's use some numbers
            </div>
            If 1 terahash can theoretically produce an amount <br/>
            of bitcoin worth $0.36 in the Last 24 hours, $0.3 <br/>
            in the 24 hours before.<br/>
            <br/>
            Meanwhile the coin price went up 8%, which means $0.3<br/>
             of Bitcoin 24 hours ago is now worth $0.324<br/>
            <br/>
            Last 24 hours Performance<br/>
            =Last 24 hours Mining/Staking Contract Profitability<br/>
            =(0.36-0.3)/0.3<br/>
            =20%<br/>
            <br/>
            Last 24 hours net gain<br/>
            =Last 24 hours Mining/Staking Contract Profitability<br/>
             in USD over Buy and Hold<br/>
            =20%-8%<br/>
            =12%<br/>
          </div>
          <i class="material-icons">help_circle</i>
        </el-tooltip>
      </div>
      <div>performance</div>
      <div>net gain
        <el-tooltip class="help-mark" effect="dark">
          <div class="tip-content" slot="content">
            <div class="tip-title">
              Let's use some numbers
            </div>
            If 1 terahash can produce an amount of bitcoin worth $0.36<br/>
            everyday on average in the last 30 days (720 hours), but only<br/>
            $0.3 from 744 hours ago to 720 hours ago, (24 hours right<br/>
            before the start of this 30 days period)<br/>
            <br/>
            Meanwhile the coin price went up 13%, which means $0.3 of <br/>
            Bitcoin 30 days ago is now worth $0.339<br/>
            <br/>
            Last 30 days performance<br/>
            =30-day Contract Average ROI (Settled in L24h)<br/>
            =(0.36*30-0.3*30)/(0.3*30)<br/>
            =20%<br/>
            <br/>
            Last 30 days net gain<br/>
            =30-day Contract Average ROI (Settled in L24h) over Buy and Hold<br/>
            =20%-13%<br/>
            =7%<br/>
          </div>
          <i class="material-icons">help_circle</i>
        </el-tooltip>
      </div>
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
    .help-mark {
    width: 12px;
    font-size: 12px;
    display: inline-block;
}
  }
}
</style>
