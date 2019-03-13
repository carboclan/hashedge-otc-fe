<template>
  <DialogContainer extra-class="trade-dialog">
    <div v-if="token" class="token" v-bind:class="token.hashType">
      <div>
        <div>
          <div><span class="hashtype">{{token.hashType}}</span></div>
          <div>{{token.name}}</div>
          <div class="desc">{{token.tokenSize | bn}} {{token.hashRateUnit}}</div>
        </div>
        <div class="desc">30days</div>
        <div class="invest">
          <input type="number" v-model="amount" placeholder="AMOUNT TO INVEST/DIVEST">
          <button v-on:click="invest">INVEST</button>
          <button v-on:click="divest">DIVEST</button>
        </div>
      </div>
      <div>
        <div class="progress">
          <div v-bind:style="{ width: Math.min(token.totalSupply || 0 / token.target * 100, 105) + '%' }"></div>
        </div>
        <div class="desc">{{token.totalSupply | eth}} / {{token.target | eth}} staked</div>
      </div>
    </div>
  </DialogContainer>
</template>

<script>
import { web3 } from '../../web3';
import DialogContainer, { DialogEventBus } from './DialogContainer';

export default {
  name: 'TradeDialog',
  components: { DialogContainer, DialogEventBus },
  beforeCreate() {
    DialogEventBus.$on('show-trade-dialog', (token) => {
      this.$data.token = token;
      DialogEventBus.$emit('show', this.$el);
    });
  },
  beforeDestroy() {
    DialogEventBus.$off('show-trade-dialog');
  },
  methods: {
    hide() {
      DialogEventBus.$emit('hide', this.$el);
    },
    async invest() {
      const recpt = await this.$data.token.exchange.investLiquidity({ value: web3.toWei(this.$data.amount, 'ether') });
      await web3.eth.getTransactionReceipt(recpt);
      alert('success');
      DialogEventBus.$emit('hide', this.$el);
    },
    async divest() {
      const recpt = await this.$data.token.exchange.divestLiquidity(web3.toWei(this.$data.amount, 'ether'), 0);
      await web3.eth.getTransactionReceipt(recpt);
      alert('success');
      DialogEventBus.$emit('hide', this.$el);
    }

  },
  data() {
    return {
      amount: null,
      token: null
    };
  }
}
</script>

<style lang="scss">
.trade-dialog {
  .dialog-container {
    width: 805px;
    box-sizing: border-box;
    padding: 16px 32px;
    background-color: #263238;
  }

  .desc {
    color: #90A4AE;
    font-size: 12px;
  }

  .token {
    display: flex;
    align-items: center;

    > div:first-child {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      flex: 1 1 auto;
      align-items: center;

      > div:first-child {
        flex: 1 1 auto;
      }

      .invest {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        input { width: 90%;  padding: 8px; background-color: transparent; color: white; }
        button { width: 35%; padding: 8px; margin: 8px; }
      }
    }

    > div:last-child {
      width: 50%;
      flex: 1 1 auto;
    }

    > div {
      text-align: left;
      padding: 16px;

      > div {
        margin-bottom: 7px;
      }

      > div:last-child {
        margin-bottom: 0;
      }

      .hashtype {
        padding: 0 3px;
        border: 1px solid transparent;
        border-radius: 4px;
        font-size: 10px;
      }

      .progress {
        width: 270px;
        height: 2px;
        background-color: #151B1F;
        border-radius: 1px;
        margin-bottom: 11px;

        > div {
          height: 2px;
        }
      }
    }

    &.POW {
      .hashtype {
        border-color: #F44336;
        color: #F44336;
      }

      .progress > div {
        background-color: #F44336;
      }
    }

    &.POS {
      .hashtype {
        border-color: #FF9800;
        color: #FF9800;
      }

      .progress > div {
        background-color: #FF9800;
      }
    }

    &.DPOS {
      .hashtype {
        border-color: #4CAF50;
        color: #4CAF50;
      }

      .progress > div {
        background-color: #4CAF50;
      }
    }

    &.POST {
      .hashtype {
        border-color: #FFEB3B;
        color: #FFEB3B;
      }

      .progress > div {
        background-color: #FFEB3B;
      }
    }
  }
}
</style>
