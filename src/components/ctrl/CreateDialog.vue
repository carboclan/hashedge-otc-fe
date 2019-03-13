<template>
<DialogContainer v-show="show" extra-class="create-dialog">
  <section v-show="step==1">
    <div class="title">
      basics
    </div>
    <div class="input-group">
      <div class="tip">payment</div>
      <select v-model="currencyType">
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
      <select v-model="outputCurrency">
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
    </div>
    <div class="input-group">
      <div class="tip">contract type</div>
      <select v-model="contractType">
        <option value="STD">STANDARD OUTPUT</option>
        <option value="ACT">ACTURE OUTPUT</option>
      </select>
    </div>
    <div class="input-group">
      <div class="tip">contract duration</div>
      <select v-model="duration">
        <option value="30">30 DAYS</option>
        <option value="90">90 DAYS</option>
        <option value="180">180 DAYS</option>
      </select>
    </div>
    <div class="input-group">
      <div class="tip">contract listing expiration date</div>
      <input class="date-input" type="date" v-model="expirationDate" />
    </div>
    <div class="footer">
      <button v-on:click="nextStep">NEXT</button>
    </div>
  </section>
  <section v-show="step==2">
    <div class="title">
      pricing
    </div>
    <div class="input-group">
      <div class="tip">pricing method</div>
      <select v-model="hashType">
        <option value="30">FIXED PRICE(BUY NOW)</option>
        <option value="90">DUTCH AUCTION</option>
        <option value="180">180 DAYS</option>
      </select>
      <div class="quantity">
        <span>Your Fixed Price</span>
        <input placeholder="Price" v-model="strikePrice" />
      </div>
    </div>
    <div class="input-group">
      <div class="tip">total offering</div>
      <div class="quantity">
        <span>Total Quantity Offering</span>
        <input placeholder="450" v-model="totalSupply"/>
      </div>
      <div class="quantity">
        <span>Minimum Order Size</span>
        <input placeholder="450" v-model="orderSize" />
      </div>
    </div>
    <div class="footer">
      <button v-on:click="nextStep">NEXT</button>
    </div>
  </section>
  <section v-show="step==3">
    <div class="title">
      mining configuration
    </div>
    <div class="input-group">
      <div class="tip">Mining Pool Name</div>
      <select v-model="hashType">
        <option value="30">FIXED PRICE(BUY NOW)</option>
        <option value="90">DUTCH AUCTION</option>
        <option value="180">180 DAYS</option>
      </select>
      <div class="quantity">
        <input placeholder="Pool Address" v-model="poolAddress" />
      </div>
      <div class="foot-note">Point your miner to this address.</div>
      <div class="quantity">
        <span>Contract Address</span>
        <input placeholder="Contract Address" v-model="contractAddress" />
      </div>
    </div>
    <div class="footer">
      <button v-on:click="nextStep">NEXT</button>
    </div>
  </section>
  <section v-show="step==4">
    <div class="title">
      validator verification
    </div>
    <div class="input-group">
      <div class="quantity">
        <input placeholder="Your Validator Address" v-model="vAddress" />
      </div>
      <div class="foot-note">Sign this message digest with the private key of your validator address. </div>
      <div class="quantity">
        <input placeholder="Your Validator Address" v-model="sAddress" />
      </div>
      <div class="foot-note">Sign this message digest with the private key of your validator address. </div>
    </div>
    <div class="input-group">
      <div class="tip">enter your signed output</div>
      <textarea v-model="signedOutput" />
      <button v-on:click="nextStep">Submit</button>
    </div>
    <div class="footer">
      <button v-on:click="nextStep">NEXT</button>
    </div>
  </section>
  <section v-show="step==5">
    <div class="title">
      deposit collateral
    </div>
    <div class="input-group">
      <div class="tip">Choose Collateral Currency</div>
      <select v-model="hashType">
        <option value="30">FIXED PRICE(BUY NOW)</option>
        <option value="90">DUTCH AUCTION</option>
        <option value="180">180 DAYS</option>
      </select>
      <div class="quantity">
        <input placeholder="Amount" v-model="cAmount" />
      </div>
      <div class="foot-note">Send exactly this amount of DAI to the address below.</div>
      <div class="quantity">
        <input placeholder="Your Validator Address" v-model="cAddress" />
      </div>
      <div class="foot-note">Contract collateral address.</div>
    </div>
    <div class="footer">
      <button v-on:click="hide">SUBMIT</button>
    </div>
  </section>
</DialogContainer>
</template>

<script>
import { web3, hashedgeFactory } from '../../web3';
import DialogContainer, { DialogEventBus } from './DialogContainer';

export default {
  name: 'CreateDialog',
  components: { DialogContainer, DialogEventBus },
  beforeCreate() {
    DialogEventBus.$on('show-create-dialog', () => {
      DialogEventBus.$emit('show', this.$el);
    });
  },
  beforeDestroy() {
    DialogEventBus.$off('show-create-dialog');
  },
  methods: {
    hide() {
      DialogEventBus.$emit('hide', this.$el);
      this.$data.step = 1;
    },
    nextStep() {
      this.$data.step = this.$data.step + 1;
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
.create-dialog {
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
