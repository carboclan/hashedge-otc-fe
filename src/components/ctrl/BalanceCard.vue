<template>
  <div>
    <div class="balance-card">
      <div class="card-top">
        <div class="card-left">
          <div class="pad-top3"><div class="context">{{token.name}}</div></div>
        </div>
        <div class="card-center">
          <div><div class="tip">AVAILABLE</div></div>
          <div class="pad-top1"><div class="context">{{token.balance | eth}}</div></div>
        </div>
        <div class="card-right">
          <div><div class="tip">ESTIMATE VALUE</div></div>
          <div class="pad-top1"><div class="price">{{token.balance * token.price | usd}}</div></div>
          <div><div class="memo">USD</div></div>
        </div>
        <!-- <div class="card-tool">
          <div v-on:click="mint"><i class="material-icons">add_circle</i></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>

import { web3, hashedgeContracts } from '../../web3';
export default {
  name: 'BalanceCard',
  props: {
    erc20: String
  },
  methods: {
    async mint() {
      const address = web3.eth.accounts[0];
      const recpt = await hashedgeContracts.erc20Tokens[this.$props.erc20].mint(address, 50e18)
      await web3.eth.getTransactionReceipt(recpt);
      const b = await hashedgeContracts.erc20Tokens[this.$props.erc20].balanceOf(address);
      this.$data.token.balance = b / 1e18
    }
  },
  async mounted() {
    const address = web3.eth.accounts[0];
    const name = await hashedgeContracts.erc20Tokens[this.$props.erc20].name();
    const b = await hashedgeContracts.erc20Tokens[this.$props.erc20].balanceOf(address);
    this.$data.token.name = name;
    this.$data.token.balance = b.toNumber()
    this.$data.token.price = this.$store.state.rateMap[name];
  },
  data() {
    return {
      token: {
        name: 'Loading',
        balance: 0,
        price: 1
      }
    };
  }
}
</script>

<style lang="scss">
.balance-card {
  width: 448px;
  background: #455A64;
  border-radius: 4px;
  font-size: 14px;
  margin: 8px;
  .card-top {
    padding: 8px;
    display: flex;
    .card-left {
      width: 180px;
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
