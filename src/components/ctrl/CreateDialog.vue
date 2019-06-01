<template>
<DialogContainer v-if="show" extra-class="create-dialog">
  <section v-show="showAlert">
    <div class="alert">you need to fulfill the require elements</div>
  </section>
  <section v-show="step === 1">
    <div class="title">
      issue a new mining contract (STEP 1/3)
    </div>
    <div class="input-group">
      <div class="tip">contract type<span class="red">*</span></div>
      <select v-model="contractAddress">
        <option value="" disabled selected>Select a contract</option>
        <option v-for="contract in contractOptions" v-bind:key="contract.address" :value="contract.address">{{contract.name}}</option>
      </select>
      <!-- <select v-model="payoffCurrency">
        <option value="" disabled selected>Payment Currency</option>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="ETH">DAI</option>
      </select> -->
    </div>
    <div class="input-group">
      <div class="tip">settle type<span class="red">*</span></div>
      <select v-model="contractType">
        <option value="STD" selected>STANDARD PAYOFF</option>
        <option value="ACT" disabled>ACTUAL PAYOFF</option>
      </select>
      <el-tooltip class="help-mark" effect="dark">
        <div class="tip-content" slot="content">
          <div class="tip-title">
            Standard Payoff
          </div>
          You pay the buyer of the contract according to the <br />
          market-wide theoretical output per unit of productivity <br />
          as published in the CoinCow Index, settled daily. i.e. <br />
          for BTC mining Contract, Standard Output for the past <br />
          24 hours is 0.00004141BTC/Th. The payout will be settled <br />
          daily from your collateral deposit. If you choose to <br />
          transfer designated amount of mining capacity to contract's <br />
          co-custodian address for the duration of the contract in <br />
          the Mining Configuration process, the amount of required <br />
          collateral deposit for issuing this contract will be <br />
          significantly less.
          <div class="tip-title">
            Actual Payoff
          </div>
          You pay the buyer of this contract according to actual mining <br />
          output per unit of productivity, settled daily. You will be <br />
          prompted to configure mining and transfer designated amount of <br />
          mining capacity to contract's co-custodian address under for <br />
          the duration of the contract.
        </div>
        <i class="material-icons">help_circle</i>
      </el-tooltip>
    </div>
    <div class="input-group">
      <div class="tip">pricing method</div>
      <select v-model="pricingMethod">
        <option value="FIXED" selected>FIXED PRICE(BUY NOW)</option>
        <!-- <option value="AUC">DUTCH AUCTION</option> -->
      </select>
      <el-tooltip class="help-mark" effect="dark">
        <div class="tip-content" slot="content">
          <div class="tip-title">pricing method</div>
          <div class="tip-title">
            Fixed Price (Buy-it-now)
          </div>
          Buyers can purchase contract immediately<br />
          at the price you set.
          <div class="tip-title">
            Dutch Auction
          </div>
          Open descending-price auction, where price<br />
          starts at an artificially high price and<br />
          lowers in steps over time to your reservation<br />
          price.
        </div>
        <i class="material-icons">help_circle</i>
      </el-tooltip>
    </div>
    <div class="input-group">
      <div class="tip">contract listing expiration date</div>
      <div class="tip">{{ expirationDate | formatDate}}</div>
      <el-tooltip class="help-mark" effect="dark">
        <div class="tip-content" slot="content">
          Your contract goes live as soon as transaction occurs. <br />
          Contract unsold after Contract Listing Expiration Date <br />
          will not be available for purchase by buyers.
        </div>
        <i class="material-icons">help_circle</i>
      </el-tooltip>
      <!-- <input class="date-input" type="date" v-model="expirationDate" disabled /> -->
    </div>
    <div class="footer">
      <button v-on:click="nextStep">NEXT</button>
    </div>
  </section>
  <section v-show="step === 2">
    <div class="title">
      issue a new mining contract (STEP 2/3)
    </div>
    <div class="title" v-on:click="switchCal" >
      <i class="material-icons">arrow_drop_down_circle</i>OPTIONAL: Suggested Price Calculator
    </div>
    <section v-if="showCal">
      <div class="tip">
        Move the sliders to input your prediction for the next 30 Days.
      </div>  
      <div class="input-group text-right">
        <div class="tip">Suggest Price</div>
        <section v-if="suggestPrice > 0">
          <div class="large-price">${{suggestPrice | usd}} USD/CONTRACT</div>
          <div class="large-price">${{suggestPrice / orderSize | usd}} USD/{{hashUnit}}</div>
        </section>
        <section v-else>
          <div class="large-price">LOADING ...</div>
        </section>
      </div>
      <div class="input-group">
          <div class="tip">DIFFICULTY:</div>
          <el-slider :min="-50" :max="50"
            v-model="diff"
            :format-tooltip="formatPercent" />
          <div class="tip">EXCHANGE RATE:</div>
          <el-slider :min="-50" :max="50"
            v-model="exRate"
            :format-tooltip="formatPercent" />
      </div>
    </section>
    <!-- <button v-on:click="applyPrice" class="price-button">Use Suggested Price</button> -->
 

   <div class="input-group">
      <div class="tip">1. pricing<span class="red">*</span></div>
      <div class="quantity">
        <span>ENTER YOUR PRICE<br />or APPLY SUGGESTED PRICE</span>
        <input placeholder="Price" v-model="price" />
        <div class="long-unit">USD/{{hashUnit}}/DAY</div>
      </div>
    </div>

    <div class="input-group">
      <div class="tip">2. contract duration<span class="red">*</span></div>
      <select v-model="duration">
        <option value="60">1 MIN</option>
        <option value="2592000" selected>30 DAYS</option>
        <option value="7776000">90 DAYS</option>
        <option value="15552000">180 DAYS</option>
      </select>
    </div>

    <div class="input-group">
      <div class="tip">3. total offering<span class="red">*</span></div>
      <div class="quantity half-input left">
        <span>TOTAL QUANTITY OFFERING</span>
        <input placeholder="Total Offering" v-model="totalSupply"/>
        <div class="unit">{{hashUnit}}</div>
      </div>
      <div class="quantity half-input right">
        <span>MINIMUM PURCHASE AMOUNT</span>
        <input placeholder="Minimum Order" v-model="orderSize" />
        <div class="unit">{{hashUnit}}</div>
      </div>
    </div>
    <div><div class="title">TOTAL PRICE</div><div class="large-price">USD {{price}}</div></div>
    <div class="footer">
      <button v-on:click="lastStep" class="left">BACK</button>
      <button v-on:click="nextStep">NEXT</button>
    </div>
  </section>
  <section v-show="step === 3">
    <div class="title">
      issue a new mining contract (STEP 3/3)
    </div>
    <div class="input-group">
      <div class="tip">Required collateral will be auto-calculated base on contract specs</div>
      <div class="tip">Collateral Currency: {{collateralCurrency}}</div>
      <!-- <select v-model="collateralCurrency">
        <option value="BTC" selected>BTC</option>
        <option value="DAI">DAI</option>
      </select> -->
      <div class="quantity">
        <input placeholder="Amount" style="width: 100%;" v-model="collateralAmount" />
      </div>
      <div class="foot-note">Your {{collateralCurrency}} will send to {{collateralAddress}}</div>
      <button v-on:click="depositCollateral" class="right">Deposit Collateral</button>
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
    <div class="title" v-on:click="switchPool" >
      <i class="material-icons">arrow_drop_down_circle</i>OPTIONAL: mining configuration
    </div>
    <div class="info">Completing this step can help reduce up to 50% of required collateral.</div>
    <div class="input-group" v-show="showPool">
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
      <div class="info">
        The Mining Configuration process may take some time. Please click "Submit" once you have completed the configuration process, and check back in 24 hours via Balance – Collateral page. You may withdraw excess collateral beyond what is required any time from Balance -Collateral page.
      </div>
    </div>
    <div class="footer">
      <button v-on:click="lastStep" class="left">BACK</button>
      <button v-on:click="submit">SUBMIT</button>
    </div>
  </section>
</DialogContainer>
</template>

<script>
import { web3, hashedgeContracts } from '../../web3';
import DialogContainer from './DialogContainer';
import moment from 'moment';

export default {
  name: 'CreateDialog',
  components: { DialogContainer },
  async mounted () {
    this.$store.dispatch('getSwapInfos');
  },
  methods: {
    formatPercent(value) {
      return (value ? (value > 0 ? '+ ' : ' ') + value.toFixed(2) + '%': '0');
    },
    switchPool() {
      this.showPool = !this.showPool;
    },
    switchCal() {
      console.log('gogogo');
      this.showCal = !this.showCal;
    },
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

      const colAmount = await oracleContract.computeProfit(
        Number(moment().unix()),
        Number(moment().unix() + Math.min(3600 * 24, this.$data.duration))
      );

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
      const recpt1 = await tokenContract.approve(collateralAddress, web3.toWei(collateralAmount, 'ether'));
      const recpt2 = await colContract.deposit(web3.toWei(collateralAmount, 'ether'));
      await web3.eth.getTransactionReceipt(recpt2);
      this.$data.collateralStep = 2;
    },
    hide() {
      DialogEventBus.$emit('hide', this.$el);
      this.$data.step = 1;
    },
    nextStep() {
      if (this.$data.step === 1) {
        if (!this.$data.contractAddress) {
          this.$data.showAlert = true;
          setTimeout(() => {
            this.$data.showAlert = false;
          }, 2000)
          return;
        }
        this.$data.hashUnit = '';
        hashedgeContracts.swap721Tokens[this.$data.contractAddress].contractUnit().then(unit => this.$data.hashUnit = unit);
      }
      if (this.$data.step === 2) {
        const { price, totalSupply, orderSize} = this.$data;
        if (price <= 0 || totalSupply <= 0 || orderSize <= 0) {
          this.$data.showAlert = true;
          setTimeout(() => {
            this.$data.showAlert = false;
          }, 2000)
          return;
        }
        this.$data.hashUnit = '';
        hashedgeContracts.swap721Tokens[this.$data.contractAddress].contractUnit().then(unit => this.$data.hashUnit = unit);
      }
      this.$data.step = this.$data.step + 1;
      if (this.$data.step === 3) {
        this.loadColInfo();
      }
    },
    lastStep() {
      this.$data.step = this.$data.step - 1;
    },
    applyPrice() {
      this.$data.price = parseInt(this.suggestPrice / 1e12)/ 1e6;
    },
    async submit() {
      if (!web3.eth.accounts[0]) {
        this.$store.commit('showDialog', { name: 'login-dialog', show: true});
      }
      const { contractAddress, duration, price, totalSupply, orderSize} = this.$data;
      console.log(contractAddress)
      const swapContract = hashedgeContracts.swap721Tokens[contractAddress];
      const recpt = await swapContract.mint(orderSize, duration, web3.toWei(price, 'ether'), totalSupply);
      await web3.eth.getTransactionReceipt(recpt);
      this.$store.dispatch('getContractList');
      this.$store.commit('hideDialog');
    }
  },
  data() {
    return {
      showPool: false,
      showAlert: false,
      showCal: false,
      pool: {
        selected: 'POOL.IN',
        url: 'btc.ss.poolin.com:443',
        address: '0xcc1b7347f23f8ef43c183d53c002d19fa2b57869'
      },
      contractAddress: '',
      step: 1,
      name: null,
      symbol: null,
      hashType: 'POW',
      contractCurrency: '',
      payoffCurrency: '',
      contractType: 'STD',
      pricingMethod: 'FIXED',
      price: 0,
      diff: 0,
      exRate: 0,
      totalSupply: 1,
      orderSize: 1,
      collateralCurrency: '',
      collateralAddress: '',
      collateralStep: 1,
      collateralAmount: 0,
      hashUnit: '',
      duration: '2592000',
      target: null
    };
  },
  computed: {
    expirationDate: function () {
      return Number(moment().unix()) + Number(this.$data.duration);
    },
    contractOptions: function () {
      if (this.$store.state.swapInfos) {
        return Object.values(this.$store.state.swapInfos);
      }
      return []
    },
    suggestPrice: function () {
      if (!this.$data.contractAddress) {
        return 0;
      }
      const { orderSize, duration, exRate, diff } = this.$data;
      const tokenInfo = _.chain(this.$store.state.erc20List)
        .map((token) => [token.code, token])
        .fromPairs()
        .value();
      const code = this.$store.state.swapInfos[this.$data.contractAddress].code;
      const payoffUSD = tokenInfo[code].priceUSD;
      return payoffUSD * orderSize * duration * (100 + exRate) * (100 - diff) / 3600 / 24 / 10000;
    },
    show: function () {
      return (this.$store.state.dialog.name === 'create-dialog');
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
    >i {
      display: inline-block;
      width: 24px;
      position: relative;
      top: 6px;
      margin: 0 10px;
    }
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
    font-size: 12px;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #CFD8DC;
  }
  .info {
    line-height: 16px;
    font-size: 12px;
    letter-spacing: 0.015em;
    color: #CFD8DC;
    padding: 8px;
  }
  .help-mark {
    position: relative;
    top: 5px;
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
    clear: both;
  }
  .quantity {
    background: #263238;
    border-bottom: 1px solid #CFD8DC;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    padding: 8px;
    height: 56px;
    margin-bottom: 16px;
    display: flex;
    &.half-input {
      width: 49%;
    }
    >span {
      font-size: 12px;
      width: 40%;
      color: #B0BEC5;
    }
    >input {
      font-family: Roboto Condensed;
      margin: 8px;
      line-height: 24px;
      font-size: 18px;
      text-align: right;
      color: white;
      width: 50%;
      float: right;
      background: none;
      border: none;
    }
    >.unit {
      width: 40px;
      float: right;
      margin: 8px 0;
      line-height: 24px;
      color:#607D8B;
    }
    >.long-unit {
      width: 120px;
      float: right;
      margin: 8px 0;
      line-height: 24px;
      color:#607D8B;
    }
  }
  .price-button {
    float: right;
    display: inline-block;
    position: relative;
    top: -55px;
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
  .alert {
    color: red;
    height: 20px;
    padding: 5px 10px;
  }
}
</style>
