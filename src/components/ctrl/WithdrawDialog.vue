<template>
<DialogContainer v-show="show" extra-class="withdraw-dialog">
  <div class="title">
    withdraw
  </div>
  <div class="input-group">
    <div class="quantity">
      <span>amount to withdraw</span>
      <input placeholder="Price" v-model="strikePrice" />
    </div>
    <div class="quantity">
      <span>withdrawal address</span>
      <input placeholder="Price" v-model="strikePrice" />
    </div>
  </div>
  <div class="footer">
    <button v-on:click="hide">CANCEL</button>
    <button v-on:click="hide">OK</button>
  </div>
</DialogContainer>
</template>

<script>
import { web3, hashedgeFactory } from '../../web3';
import DialogContainer, { DialogEventBus } from './DialogContainer';

export default {
  name: 'WithdrawDialog',
  components: { DialogContainer, DialogEventBus },
  beforeCreate() {
    DialogEventBus.$on('show-withdraw-dialog', () => {
      DialogEventBus.$emit('show', this.$el);
    });
  },
  beforeDestroy() {
    DialogEventBus.$off('show-withdraw-dialog');
  },
  methods: {
    hide() {
      DialogEventBus.$emit('hide', this.$el);
      this.$data.step = 1;
    },
    async submit() {
      const { name, symbol, hashType, currencyType, tokenSize, hashUnit, strikePrice, duration, totalSupply, target } = this.$data;
      const recpt = await hashedgeFactory.createExchange(
        web3.toWei(target, 'ether'), name, symbol,
        totalSupply, hashType, currencyType, hashUnit, tokenSize,
        Date.now() / 1000 + 24 * 3600, Date.now() / 1000 + 24 * 3600 * (duration + 1), web3.toWei(strikePrice, 'ether')
      );

      await web3.eth.getTransactionReceipt(recpt);
      alert('success');
      DialogEventBus.$emit('hide', this.$el);
    }
  },
  data() {
    return {
      step: 1,
      name: null,
      symbol: null,
      show: false,
      hashType: 'POW',
      outputCurrency: 'BTC',
      currencyType: 'BTC',
      contractType: null,
      tokenSize: 1,
      hashUnit: 'TH/s',
      strikePrice: null,
      duration: 30,
      expirationDate: null,
      orderSize: 0,
      totalSupply: null,
      target: null
    };
  }
}
</script>

<style lang="scss">
.withdraw-dialog {
  .dialog-container {
    width: 432px;
    background-color: #37474F;
  }
  .title {
    line-height: 24px;
    font-size: 17px;
    color: white;
    margin: 8px 0;
  }
  .input-group {
    padding: 8px;
    select {
      background-color: #263238;
      font-size: 14px;
      line-height: 24px;
      min-width: 49%;
      margin-bottom: 16px;
      color: #CFD8DC;
    }
    .date-input {
      font-size: 14px;
      line-height: 24px;
      min-width: 49%;
      margin-bottom: 16px;
      background: #263238;
      border: 1px solid #CFD8DC;
      box-sizing: border-box;
      color: #CFD8DC;
      border-radius: 4px;
    }
    textarea {
      width: 100%;
      height: 100px;
      background: #455A64;
      border: 0.25px solid #607D8B;
      box-sizing: border-box;
      border-radius: 4px;
    }
  }
  .tip {
    line-height: 20px;
    font-size: 10px;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #CFD8DC;
  }
  .foot-note {
    position: relative;
    top: -16px;
    font-size: 12px;
    color: #B0BEC5;
    text-align: right;
  }
  .quantity {
    background: #263238;
    border-bottom: 1px solid #CFD8DC;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    padding: 8px;
    height: 56px;
    margin-bottom: 16px;
    >span {
      font-size: 12px;
      color: #B0BEC5;
    }
    >input {
      font-family: Roboto Condensed;
      margin: 8px;
      line-height: 24px;
      font-size: 18px;
      text-align: right;
      color: white;
      width: 150px;
      float: right;
      background: none;
      border: none;
    }
  }
  .spacer {
    width: 100%;
    border: 0.5px solid #263238;
  }
  .footer {
    background: #263238;
    border-radius: 0px 0px 4px 4px;
    height: 36px;
    text-align: right;
  }
}
</style>
