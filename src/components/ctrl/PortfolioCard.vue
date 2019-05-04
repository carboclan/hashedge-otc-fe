<template>
  <div>
    <div class="portfolio-card">
      <div class="card-top">
        <div class="card-left">
          <div><div class="tip">{{portfolio.shareTotal}} UNITS</div></div>
          <div class="pad-top1"><div class="context">{{portfolio.name}}</div></div>
          <div><div class="memo">You are {{portfolio.type}}</div></div>
        </div>
        <div class="card-center">
          <div><div class="tip">RECEIVED</div></div>
          <div class="pad-top1"><div class="context">{{portfolio.received | eth}}</div></div>
          <div><div class="memo">{{portfolio.rUnit}}</div></div>
        </div>
        <div class="card-center">
          <div><div class="tip">PAID</div></div>
          <div class="pad-top1"><div class="context">{{portfolio.paid | usd}}</div></div>
          <div><div class="memo">{{portfolio.pUnit}}</div></div>
        </div>
        <div class="card-right">
          <div><div class="tip">ESTIMATE NET GAIN</div></div>
          <div class="pad-top2"><div class="price">{{portfolio.estimateNetGain | percent}}</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PortfolioCard',
  props: {
    portfolio: Object
  },
  data() {
    return {
    };
  }
}
</script>

<style lang="scss">
.portfolio-card {
  width: 448px;
  background: #455A64;
  border-radius: 4px;
  font-size: 14px;
  margin: 8px;
  .card-top {
    padding: 8px;
    display: flex;
    .card-left {
      width: 160px;
    }
    .card-center {
      width: 100px;
    }
    .card-right {
      width: 160px;
      div {
        text-align: right;
      }
    }
    .card-tool {
      width: 40px;
      padding: 23px 8px;
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
