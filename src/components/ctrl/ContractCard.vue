<template>
  <div>
    <div class="contract-card" v-bind:style="{ background: selected ? '#37474F' : '#455A64' }">
      <div class="card-top">
        <div class="card-left">
          <div><div class="tip">{{contract.duration | duration}}</div></div>
          <div><div class="pad-top2"><span class="hash-type">{{contract.hashType}}</span></div></div>
        </div>
        <div class="card-center">
          <div><div class="tip">{{contract.issuer}}</div></div>
          <div class="pad-top2"><div class="context">{{contract.name}}-{{contract.payoffType}}</div></div>
        </div>
        <div class="card-right">
          <div><div class="memo">{{contract.rating}}</div></div>
          <div class="pad-top1"><div class="price">${{contract.priceUSD / contract.contractSize * 3600 * 24 / contract.duration | usd}} </div>/{{contract.unit}}/DAY</div>
          <div><div class="memo">{{contract.code}} {{contract.priceCOIN / contract.contractSize * 3600 * 24 / contract.duration | btc}} /{{contract.unit}}/DAY</div></div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="card-bottom">
          <div><div class="shares">{{contract.shareSold * contract.contractSize}} {{contract.unit}} SOLD</div></div>
          <div class="process"><div class="bar" v-bind:style="{width: contract.shareSold/contract.shareTotal*256 + 'px'}"></div></div>
          <div><div class="shares">{{contract.shareTotal * contract.contractSize}} {{contract.unit}} TOTAL</div></div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ContractCard',
  props: {
    contract: Object,
    selected: Boolean,
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
  .hash-type {
    color: #455A64;
    background-color: #CFD8DC;
    border-radius: 4px;
    padding: 2px 4px;
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
    border-bottom: 1px solid #37474F;
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
