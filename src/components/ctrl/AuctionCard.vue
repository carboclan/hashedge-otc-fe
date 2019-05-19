<template>
  <div>
    <div class="contract-card">
      <div class="card-top">
        <div class="card-left">
          <div><div class="tip">{{order.portfolio.duration | duration}}</div></div>
          <div class="pad-top2"><div class="context">{{order.portfolio.contractSize}}</div></div>
          <div><div class="memo">{{order.portfolio.unit}}</div></div>
        </div>
        <div class="card-center">
          <div><div class="tip">{{order.portfolio.hashType}}</div></div>
          <div class="pad-top2"><div class="context">{{order.portfolio.name}}</div></div>
          <div><div class="memo">{{order.portfolio.payoffType}}</div></div>
        </div>
        <div class="card-right">
          <div><div class="memo">{{order.portfolio.rating}}</div></div>
          <div class="pad-top1"><div class="price">${{order.portfolio.priceUSD | usd}}</div></div>
          <div><button v-on:click="buy">BUY</button></div>
        </div>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</template>
<script>
import { assetDataUtils } from '0x.js';
import { hashedgeContracts } from '../../web3';
import { waitForInit, bidAuction } from '../../web3/0x';

export default {
  name: 'AuctionCard',
  props: {
    order: Object
  },
  methods: {
    async buy() {
      console.log(this.$props.order);
      await waitForInit();
      const order = this.$props.order.order;

      const decodedErc20 = assetDataUtils.decodeERC20AssetData(order.takerAssetData);
      const erc20 = hashedgeContracts.erc20Tokens[decodedErc20.tokenAddress];

      const bid = await bidAuction(order, erc20);
      console.log(bid);
    }
  },
  data() {
    return {
    };
  }
}
</script>

<style lang="scss">
.contract-card {
  width: 448px;
  background: #455A64;
  border-radius: 4px;
  font-size: 14px;
  margin: 8px;
  .card-top {
    padding: 8px;
    display: flex;
    .card-left {
      width: 80px;
    }
    .card-center {
      width: 200px;
    }
    .card-right {
      width: 160px;
      div {
        text-align: right;
      }
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
  .pad-top1 {
    padding-top: 8px;
  }
  .pad-top2 {
    padding-top: 16px;
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
    width: 80px;
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
    height: 1px;
    margin: 1px;
  }
}
</style>
