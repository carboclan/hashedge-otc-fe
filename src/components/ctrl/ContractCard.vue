<template>
  <div>
    <div class="contract-card">
      <div class="card-top">
        <div class="card-left">
          <div><div class="tip">SECONDARY</div></div>
          <div class="pad-top2"><div class="context">15:30</div></div>
          <div><div class="memo">hours left</div></div>
        </div>
        <div class="card-center">
          <div><div class="tip">POW</div></div>
          <div class="pad-top2"><div class="context">Bitcoin</div></div>
          <div><div class="memo">Standard Payout</div></div>
        </div>
        <div class="card-right">
          <div><div class="memo">☆☆☆☆☆</div></div>
          <div class="pad-top1"><div class="price">$0.90/Th</div></div>
          <div><div class="memo">BTC 0.0001</div></div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="card-bottom">
          <div><div class="shares">999,999 SOLD</div></div>
          <div class="process"><div class="bar"></div></div>
          <div><div class="shares">999,999 SHARES</div></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ContractCard',
  data() {
    return {
      contract: null
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
