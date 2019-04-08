<template>
<DialogContainer v-show="show" extra-class="create-dialog">
  <section v-show="step==1">
    <div class="title">
      basics
    </div>
    <div class="input-group">
      <!--<div class="tip">payment</div>-->
      <select v-model="contractAddress">
        <option value="" disabled selected>Contract</option>
        <option v-for="contract in contractOptions" v-bind:key="contract.address" :value="contract.address">{{contract.name}}</option>
      </select>
      <!-- <select v-model="outputCurrency">
        <option value="" disabled selected>Payment Currency</option>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="ETH">DAI</option>
      </select> -->
    </div>
    <div class="input-group">
      <div class="tip">contract type</div>
      <select v-model="contractType">
        <option value="STD" selected>STANDARD OUTPUT</option>
        <!-- <option value="ACT">ACTURE OUTPUT</option> -->
      </select>
    </div>
    <div class="input-group">
      <div class="tip">contract duration</div>
      <select v-model="duration">
        <option value="60">1 MIN</option>
        <option value="2592000" selected>30 DAYS</option>
        <option value="7776000">90 DAYS</option>
        <option value="15552000">180 DAYS</option>
      </select>
    </div>
    <div class="input-group">
      <div class="tip">contract listing expiration date</div>
      <div class="tip">{{ expirationDate | formatDate}}</div>
      <!-- <input class="date-input" type="date" v-model="expirationDate" disabled /> -->
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
      <select v-model="pricingMethod">
        <option value="FIXED" selected>FIXED PRICE(BUY NOW)</option>
        <!-- <option value="AUC">DUTCH AUCTION</option> -->
      </select>
      <div class="quantity">
        <span>Your Fixed Price</span>
        <input placeholder="Price" v-model="price" />
      </div>
    </div>
    <div class="input-group text-right">
        <div class="tip">Suggest Price</div>
        <div class="large-price">{{(0.2012*(100+diff)*(100+exRate) /10000).toFixed(4)}} USD</div>
        <button v-on:click="applyPrice">Use Suggest Price</button>
    </div>
    <div class="input-group">
        <div class="tip">DIFFICULTY %</div>
        <el-slider :min="-10" :max="10"
          v-model="diff" />
        <div class="tip">EXCHANGE RATE %</div>
        <el-slider :min="-10" :max="10"
          v-model="exRate" />
    </div>
    <div class="input-group">
      <div class="tip">total offering</div>
      <div class="quantity">
        <span>Total Quantity Offering</span>
        <input placeholder="Total Offering" v-model="totalSupply"/>
      </div>
      <div class="quantity">
        <span>Contract Size</span>
        <input placeholder="Minimum Order" v-model="orderSize" />
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
      <select v-model="pool.selected" v-on:change="setPoolInfo">
        <option value="POOL.IN">pool.in</option>
        <option value="FISH">Fish Pool</option>
        <option value="BTC">BTC.com</option>
        <option value="ABC">ABC</option>
      </select>
      <div class="quantity">
        <input placeholder="Pool Address" style="width: 100%;" v-model="pool.url"/>
      </div>
      <div class="foot-note">Point your miner to this address.</div>
      <div class="quantity">
        <input placeholder="Contract Address" style="width: 100%" v-model="pool.address" />
      </div>
      <div class="foot-note">Contract Address</div>
      <div class="status">
        <div class="tip">Awaiting Configuration</div>
        <el-progress type="circle" color="#90A4AE" :percentage="50" status="text">1 of 2</el-progress>
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
        <input placeholder="Your Validator Address"/>
      </div>
      <div class="foot-note">We will automatically generate a message digest for you to sign.</div>
      <div class="quantity">
        <input placeholder="Your Validator Address"/>
      </div>
      <div class="foot-note">Sign this message digest with the private key of your validator address. </div>
    </div>
    <div class="input-group">
      <div class="tip">enter your signed output</div>
      <textarea/>
      <button>Submit</button>
    </div>
    <div class="status">
      <div class="tip">Awaiting Varification</div>
      <el-progress type="circle" color="#90A4AE" :percentage="50" status="text">1 of 2</el-progress>
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
      <div class="tip">Collateral Currency</div>
      <div class="tip">{{collateralCurrency}}</div>
      <!-- <select v-model="collateralCurrency">
        <option value="BTC" selected>BTC</option>
        <option value="DAI">DAI</option>
      </select> -->
      <div class="quantity">
        <input placeholder="Amount" v-model="collateralAmount" />
      </div>
      <div class="foot-note">Send exactly this amount of {{collateralCurrency}} to the address below.</div>
      <button v-on:click="depositCollateral">Collateral</button>
      <!-- <div class="quantity">
        <input placeholder="Your Collateral Address" v-model="collateralAddress" />
      </div>
      <div class="foot-note">Contract collateral address.</div> -->
    </div>
    <div class="status">
      <div class="tip" v-show="collateralStep == 1">Awaiting Collateral</div>
      <div class="tip" v-show="collateralStep == 2">Collateral Deposited</div>
      <el-progress type="circle" color="#90A4AE" :percentage="collateralStep * 50" status="text">{{collateralStep}} of 2</el-progress>
    </div>
    <div class="footer">
      <button v-on:click="submit">SUBMIT</button>
    </div>
  </section>
</DialogContainer>
</template>

<script>
import { web3, hashedgeContracts } from '../../web3';
import DialogContainer, { DialogEventBus } from './DialogContainer';
import moment from 'moment';

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
  async mounted () {
    const contractOptions = await Promise.all(Object.keys(hashedgeContracts.swap721Tokens).map( async key => {
      const name = await hashedgeContracts.swap721Tokens[key].name();
      return ({
        address: key,
        name: name
      })
    }));
    this.$data.contractOptions = contractOptions;
  },
  methods: {
    setPoolInfo() {
      const selected = this.pool.selected;
      if (selected === 'POOL.IN') {
        this.pool.url = 'btc.ss.poolin.com:443';
        this.pool.address = '0xcc1b7347f23f8ef43c183d53c002d19fa2b57869';
      } else {
        this.pool.url = '';
        this.pool.address = '';
      }
    },
    async loadColInfo() {
      const swapContract = hashedgeContracts.swap721Tokens[this.$data.contractAddress];
      const colAddress = await swapContract.floatingLegCollateral();
      const colContract = hashedgeContracts.collaterals[colAddress];
      const floatingLegAddress = await colContract.underlying();
      const floatingLegContract = hashedgeContracts.erc20Tokens[floatingLegAddress];
      const floatingLegName = await floatingLegContract.name();
      const oracleAddress = await swapContract.oracle();
      const oracleContract = hashedgeContracts.oracles[oracleAddress];
      const colAmount = await oracleContract.computeProfit(Number(moment().unix()), Number(moment().unix()) + Number(this.$data.duration));
      this.$data.collateralCurrency = floatingLegName;
      this.$data.collateralAddress = colAddress;
      this.$data.floatingLegAddress = floatingLegAddress;
      this.$data.collateralAmount = colAmount * this.$data.totalSupply * this.$data.orderSize * 1.5 / 1e18;
    },
    async depositCollateral() {
      const { collateralAmount, collateralAddress, floatingLegAddress } = this.$data;
      const colContract = hashedgeContracts.collaterals[collateralAddress];
      const tokenContract = hashedgeContracts.erc20Tokens[floatingLegAddress];
      const batch = []
      batch.push(colContract.deposit(web3.toWei(collateralAmount, 'ether')));
      batch.push(tokenContract.approve(collateralAddress, web3.toWei(collateralAmount, 'ether')));
      const recpt = await Promise.all(batch);
      await web3.eth.getTransactionReceipt(recpt[0]);
      this.$data.collateralStep = 2;
    },
    hide() {
      DialogEventBus.$emit('hide', this.$el);
      this.$data.step = 1;
    },
    nextStep() {
      if (this.$data.step === 3) {
        this.$data.step = this.$data.step + 2;
      } else {
        this.$data.step = this.$data.step + 1;
      }
      if (this.$data.step == 5) {
        this.loadColInfo();
      }
    },
    applyPrice() {
      this.$data.price = Math.round(10 ** 6 * 0.2012*(100+this.$data.diff)*(100+this.$data.exRate)/10000) / 10 ** 6;
    },
    async submit() {
      const { contractAddress, duration, price, totalSupply, orderSize} = this.$data;
      const swapContract = hashedgeContracts.swap721Tokens[this.$data.contractAddress];
      const recpt = await swapContract.mint(orderSize, duration, web3.toWei(price, 'ether'), totalSupply);
      await web3.eth.getTransactionReceipt(recpt);
      DialogEventBus.$emit('hide', this.$el);
    }
  },
  data() {
    return {
      pool: {
        selected: 'POOL.IN',
        url: 'btc.ss.poolin.com:443',
        address: '0xcc1b7347f23f8ef43c183d53c002d19fa2b57869'
      },
      contractAddress: '',
      contractOptions: [],
      step: 1,
      name: null,
      symbol: null,
      show: false,
      hashType: 'POW',
      contractCurrency: '',
      outputCurrency: '',
      contractType: 'STD',
      pricingMethod: 'FIXED',
      price: 0,
      diff: 1,
      exRate: 1,
      totalSupply: 0,
      orderSize: 1,
      collateralCurrency: '',
      collateralAddress: '',
      collateralStep: 1,
      collateralAmount: 0,
      hashUnit: 'TH/s',
      duration: '2592000',
      target: null
    };
  },
  computed: {
    expirationDate: function () {
      return Number(moment().unix()) + Number(this.$data.duration);
    }
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
  .status {
    width: 160px;
    border-radius: 4px;
    background-color: #263238;
    margin: 8px auto;
    padding: 8px;
    text-align: center;
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
