<template>
  <div class="right-panel">
    <div class="title">selected contract details</div>
    <div class="contract-detail">
      <div class="detail-header">
        <div class="quantity">
          <span>EnterQuantity</span>
          <input placeholder="Quantity" v-model="quantity"/>
        </div>
        <div class="tip">TOTAL PRICE</div>
        <div class="large-price">${{contract.priceUSD * quantity | usd}}</div>
        <div class="memo">BTC {{contract.priceBTC * quantity | btc}}</div>
        <div class="tool"><button>BUY</button></div>
      </div>
      <div class="spacer"></div>
      <div class="detail-cell">
        <div>
          <div class="tip">QUANTITY AVALABLE</div>
          <div class="small-price">{{contract.shareTotal - contract.shareSold}}</div>
          <div class="memo">of {{contract.shareTotal}} Units</div>
        </div>
        <div>
          <div class="tip">CONTRACT UNIT PRICE</div>
          <div class="small-price">${{contract.priceUSD}}/{{contract.unit}}</div>
          <div class="memo">BTC {{contract.priceBTC}}/{{contract.unit}}</div>
        </div>
      </div>
      <section v-if="contract.pricingMethod == 'AUCTION'">
        <div class="spacer"></div>
        <div class="detail-cell">
          <div>
            <div class="tip">START PRICE</div>
            <div class="small-price">${{contract.priceUSD}}/{{contract.unit}}</div>
            <div class="memo">Today</div>
          </div>
          <div>
            <div class="tip">RESERVATION PRICE</div>
            <div class="small-price">${{contract.priceUSD}}/{{contract.unit}}</div>
            <div class="memo">02.15.2019</div>
          </div>
        </div>
      </section>
      <div class="spacer"></div>
      <div class="detail-footer">
        <div class="tip">DIFFICULTY %</div>
        <el-slider :min="-10" :max="10"
          v-model="diff" />
      </div>
      <div class="detail-footer">
        <div class="tip">EXCHANGE RATE %</div>
        <el-slider :min="-10" :max="10"
          v-model="exRate" />
      </div>
      <div class="detail-footer">
          <div class="tip">EXPECTED OUTPUT CALCULATOR</div>
          <div class="large-price">${{0.3212 * (100 + exRate) * (100 - diff) * quantity/ 10000 | usd}}</div>
          <div class="memo">BTC {{0.00013212 * (100 + exRate) * (100 - diff) * quantity /10000 | btc}} OR ETH {{0.002312 * (100 + exRate) * (100 - diff) * quantity / 10000 | btc}}</div> 
      </div>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'

Vue.filter('usd', function (value) {
  return value.toFixed(4);
});

Vue.filter('btc', function (value) {
  return value.toFixed(8);
});

export default {
  name: 'ContractDetail',
  props: {
    contract: Object
  },
  methods: {
    async submit() {
      // const { quantity } = this.$data;
      // const { contract } = this.$props;
      // var batch = web3.createBatch();
      // batch.add(DaiContract.approve(hashedgeFactory.address, web3.toWei(contract.priceUSD*quantity, 'ether')));
      // batch.add(hashedgeFactory.buy(contract.address,
      //   quantity
      // ));
      // recpt = await batch.excute();
      // await web3.eth.getTransactionReceipt(recpt);
      alert('buy');
    }
  },
  data() {
    return {
      quantity: null,
      diff: 0,
      exRate: 0
    };
  }
}
</script>

<style lang="scss">
.right-panel {
  position: absolute;
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
    border: 0.25px solid #607D8B;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 8px;
    height: 56px;
    margin-bottom: 16px;
    >span {
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
  .tool {
    text-align: right;
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
</style>
