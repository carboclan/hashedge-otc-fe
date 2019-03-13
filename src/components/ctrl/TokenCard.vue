<template>
  <div>
    <div class="token-card">
      <div class="card-top">
        <div class="card-left">
          <div><div class="tip">POW</div></div>
          <div><div class="context">Bitcoin</div></div>
          <div><div class="memo">BTC</div></div>
        </div>
        <div class="card-center">
          <div class="pad-top3"><div class="context">0.16 USD/TH</div></div>
          <div><div class="memo">BTC 0.000041/TH</div></div>
        </div>
        <div class="card-right">
          <div class="pad-top2"><div class="price">+99.99%</div></div>
          <div><div class="memo">Up to</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TokenCard',
  data() {
    return {
      token: null
    };
  }
}
</script>

<style lang="scss">
.token-card {
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
  .pad-top3 {
    padding-top: 20px;
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
