<template>
  <div>
    <div class="collateral-card">
      <div class="card-top">
        <div class="card-left">
          <div><div class="tip">{{col.hashType}}</div></div> 
          <div class="pad-top1"><div class="context">{{col.name}}</div></div>
          <div><div class="memo">{{col.payoutType}}</div></div>
        </div>
        <div class="card-center">
          <div><div class="tip">COLLATERAL</div></div> 
          <div class="pad-top1"><div class="context">{{col.balance | eth}}</div></div>
          <div><div class="memo">{{col.name}}</div></div>
        </div>
        <div class="card-center">
          <div><div class="tip">OUTPUT (24H)</div></div>
          <div class="pad-top1"><div class="context">{{col.margin | eth}}</div></div>
          <div><div class="memo">{{col.name}}</div></div>
        </div>
        <div class="card-right">
          <div><div class="tip">COLLATERAL RATE</div></div>
          <div class="pad-top2"><div class="price" v-bind:class="col.collateralRate < 150 ? 'alert' : ''">{{col.collateralRate | percent}}</div></div>
        </div>
        <div class="card-tool">
          <div v-on:click="showWithdrawDialog"><i class="material-icons">remove_circle</i></div>
          <div v-on:click="showDepositDialog"><i class="material-icons">add_circle</i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { DialogEventBus } from './DialogContainer';
import { web3, hashedgeContracts } from '../../web3';
export default {
  name: 'collateralCard',
  props: {
    collateral: String
  },
  async mounted() {
    const address = web3.eth.accounts[0];
    const b = await hashedgeContracts.collaterals[this.$props.collateral].balanceOf(address);
    const m = await hashedgeContracts.collaterals[this.$props.collateral].marginOf(address);
    const u = await hashedgeContracts.collaterals[this.$props.collateral].underlying();
    const n = await hashedgeContracts.erc20Tokens[u].name();
    this.$data.col.margin  = m.toNumber();
    this.$data.col.balance = b.toNumber();
    this.$data.col.name = n;
    this.$data.col.underlying = u;
    this.$data.col.collateralRate = b * 100 / m;
  },
  methods: {
    showWithdrawDialog() {
      DialogEventBus.$emit('show-withdraw-dialog', this.$props.collateral);
    },
    showDepositDialog() {
      DialogEventBus.$emit('show-deposit-dialog', this.$props.collateral);
    }
  },
  data() {
    return {
      col: {
        hashType: 'POW',
        name: 'Loading',
        payoutType: 'Standard',
        margin: 0,
        balance: 0,
        collateralRate: 200
      }
    };
  }
}
</script>

<style lang="scss">
.collateral-card {
  width: 448px;
  background: #455A64;
  border-radius: 4px;
  font-size: 14px;
  margin: 8px;
  .card-top {
    padding: 8px;
    display: flex;
    .card-left {
      width: 160px;
    }
    .card-center {
      width: 100px;
    }
    .card-right {
      width: 140px;
      div {
        text-align: right;
      }
    }
    .card-tool {
      width: 40px;
      padding: 12px 8px;
      text-align: center;
    }
  }
  .material-icons {
    line-height: 24px;
    font-size: 18px;
    text-align: center;
    letter-spacing: 0.0015em;
    color: #263238;
  }
  .tip {
    line-height: 20px;
    font-size: 10px;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #CFD8DC;
  }
  .pad-top1 {
    padding-top: 8px;
  }
  .pad-top2 {
    padding-top: 16px;
  }
  .pad-top3 {
    padding-top: 28px;
  }
  .context {
    line-height: 24px;
    font-size: 16px;
    letter-spacing: 0.005em;
    color: #CFD8DC;
  }
  .memo {
    line-height: 24px;
    font-size: 12px;
    letter-spacing: 0.004em;
    color: #78909C;
  }
  .price {
    font-family: Eczar;
    line-height: 28px;
    font-size: 24px;
    text-align: right;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #EEF9F5;
    &.alert {
      color: rgb(255, 34, 63);
    }
  }
  .spacer {
    width: 100%;
    border-bottom: 0.5px solid #37474F;
  }
  .card-bottom {
    padding: 8px;
    display: flex;
  }
  .shares {
    line-height: 20px;
    font-size: 10px;
    text-align: center;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #78909C;
  }
  .process {
    background: #37474F;
    border-radius: 2px;
    width: 256px;
    height: 3px;
    margin: 8px 16px;
  }
  .bar {
    background: #78909C;
    border-radius: 2px;
    width: 100px;
    height: 1px;
    margin: 1px;
  }
}
</style>
