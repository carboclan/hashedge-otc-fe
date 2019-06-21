<template>
  <div class="right-panel">
    <div class="title">selected contract details</div>
    <div class="contract-detail">
      <div class="detail-header">
        <div>
          <div class="tip">Order Summary</div>
          <div class="small-price">Price: ${{contract.priceUSD / contract.contractSize * 3600 * 24 / contract.duration | usd}}/{{contract.unit}}/DAY</div>
          <div class="small-price">Contract Duration: {{contract.duration | duration}}</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-header">
        <div class="quantity">
          <span>EnterQuantity</span>
          <input placeholder="Quantity" v-model="quantity"/>
          <div class="unit">{{contract.unit}}</div>
        </div>
        <div class="small-price">{{(contract.shareTotal - contract.shareSold) * contract.contractSize}} {{contract.unit}} Available</div>
        <div class="small-price">Quantity Increment: {{contract.contractSize}} {{contract.unit}}</div>
        <div class="tip">TOTAL PRICE</div>
        <div class="large-price">${{contract.priceUSD * quantity / contract.contractSize | usd}}</div>
        <div class="memo">{{contract.code}} {{contract.priceCOIN * quantity / contract.contractSize | btc}}</div>
      </div>
      <section v-if="contract.pricingMethod == 'AUCTION'">
        <div class="spacer"></div>
        <div class="detail-cell">
          <div>
            <div class="tip">START PRICE</div>
            <div class="small-price">${{contract.priceUSD | usd}}/{{contract.unit}}</div>
            <div class="memo">Today</div>
          </div>
          <div>
            <div class="tip">RESERVATION PRICE</div>
            <div class="small-price">${{contract.priceUSD | usd}}/{{contract.unit}}</div>
            <div class="memo">02.15.2019</div>
          </div>
        </div>
      </section>
    </div>
    <div class="tool"><button v-on:click="submit">BUY</button></div>
    <div class="title">OPTIONAL: calculate contract’s expected payoff</div>
    <div class="contract-detail">
      <div class="detail-footer">
        <div class="tip">DIFFICULTY:</div>
        <el-slider :min="-50" :max="50"
          v-model="diff"
          :format-tooltip="formatPercent" />
      </div>
      <div class="detail-footer">
        <div class="tip">EXCHANGE RATE: {{ rateMap[contract.code] * 1e18  * (100 + exRate) / 100 | usd}} USD</div>
        <el-slider :min="-50" :max="50"
          v-model="exRate"
          :format-tooltip="formatPercent" />
      </div>
      <div class="detail-footer">
          <div class="tip">OPTIONAL: Expected Payoff Calculator</div>
          <div class="large-price">${{contract.payoffUSD * contract.duration * (100 + exRate) * (100 - diff) * quantity / 3600 / 24 / 10000 | usd}}</div>
          <div class="memo">{{contract.code}} {{contract.payoff * contract.duration * (100 + exRate) * (100 - diff) * quantity /3600 / 24 / 10000| btc}}</div>
      </div>
    </div>
  </div>
</template>
<script>

import { web3, hashedgeContracts } from '../../web3';

export default {
  name: 'ContractDetail',
  props: {
    contract: Object
  },
  computed: {
    rateMap() {
      return this.$store.state.rateMap;
    }
  },
  methods: {
    formatPercent(value) {
      return (value ? (value > 0 ? '+ ' : ' ') + value.toFixed(2) + '%': '0');
    },
    async submit() {
      const { quantity } = this.$data;
      const { contract } = this.$props;
      if (quantity < 1 || quantity > (contract.shareTotal - contract.shareSold) * contract.contractSize) {
        alert('Invalid Amount!');
        return;
      }
      const { address, priceUSD } = contract;
      const totalPrice = priceUSD * quantity / contract.contractSize;
      const tokens = contract.avaliableShares.slice(0,parseInt(quantity / contract.contractSize));
      const swapContract = this.$store.state.contracts.getContract(address);
      const fixLegAddr = await swapContract.fixLegToken();
      const fixLegContract = this.$store.state.contracts.getContract(fixLegAddr);
      this.$store.dispatch('contracts/pushTransaction', {
        contract: fixLegContract, method: 'approve',
        args: [address, totalPrice],
        check: true
      });
      this.$store.dispatch('contracts/pushTransaction', {
        contract: swapContract, method: 'initialBuy',
        args: [web3.toWei(tokens)],
        check: false
      });

      const error = await this.$store.state.contracts.waitPendingTransactions();
      if (!error) this.$store.dispatch('getContractList');
    }
  },
  data() {
    return {
      quantity: this.$props.contract.contractSize,
      diff: 0,
      exRate: 0
    };
  }
}
</script>

<style lang="scss">
.right-panel {
  position: fixed;
  top: 200px;
  left: 820px;
  padding: 8px;
  .title {
    font-weight: bold;
    line-height: 24px;
    font-size: 14px;
    color: #263238;
  }
}
.contract-detail {
  width: 330px;
  background: #37474F;
  border-radius: 4px;
  font-size: 14px;
  .detail-header, .detail-footer {
    padding: 16px;
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
    >span {
      font-size: 12px;
      width: 30%;
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
      width: 20%;
      float: right;
      margin: 8px 0;
      line-height: 24px;
      color:#607D8B;
    }
  }
  .detail-cell {
    display: flex;
    width: 100%;
    >div {
      width: 50%;
      padding: 16px;
    }
    >div:first-child {
      border-right: 0.5px solid #263238;
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
  .small-price  {
    line-height: 24px;
    font-size: 16px;
    text-align: right;
    letter-spacing: 0.005em;
    color: #78909C;
  }
  .memo {
    line-height: 24px;
    font-size: 12px;
    letter-spacing: 0.004em;
    text-align: right;
    color: #546E7A;
  }
  .large-price {
    font-family: Eczar;
    line-height: 28px;
    font-size: 24px;
    text-align: right;
    font-feature-settings: 'tnum' on, 'lnum' on;
    color: #78909C;
  }
  .spacer {
    width: 100%;
    border: 0.5px solid #263238;
  }
}
.tool {
  text-align: right;
  margin: 10px;
}
</style>
