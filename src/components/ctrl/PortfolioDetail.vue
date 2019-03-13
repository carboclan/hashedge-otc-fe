<template>
  <div class="right-panel">
    <div class="title">selected contract details</div>
    <div class="portfolio-detail">
      <div class="detail-header">
        <div class="tip">PROGRESS</div>
        <div class="large-price">5/30 days</div>
        <div class="process-bar">
            <div><div class="shares">1.15.2019</div></div>
            <div class="process"><div class="bar"></div></div>
            <div><div class="shares">21.15.2019</div></div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-header">
        <div class="seller">Contract Seller</div>
      </div>
      <div class="spacer"></div>
      <div class="detail-header">
        <div class="tip">ESTIMATED NET GAIN</div>
        <div class="large-price">5/30 days</div>
      </div>
      <div class="spacer"></div>
      <div class="detail-cell">
        <div>
          <div class="tip">TOTAL RECEIVED</div>
          <div class="small-price">5</div>
          <div class="memo">DAI</div>
        </div>
        <div>
          <div class="tip">TOTAL PAID</div>
          <div class="small-price">287</div>
          <div class="memo">DAI</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-cell">
        <div>
          <div class="tip">AMOUNT</div>
          <div class="small-price">200</div>
          <div class="memo">DAI</div>
        </div>
        <div>
          <div class="tip">PRICE</div>
          <div class="small-price">0.00005</div>
          <div class="memo">DAI</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-footer">
          <div class="tip">TXID: Txid 0x0203d0d0f00340304f0d0030420423A</div>
          <div class="copy">COPY</div>
      </div>
    </div>
    <div class="tool"><button>TERMINATE</button></div>
  </div>
</template>
<script>

export default {
  name: 'PortfolioDetail',
  data() {
    return {
      portfolio: null
    };
  }
}
</script>

<style lang="scss">
.right-panel {
  position: fixed;
  top: 170px;
  left: 820px;
  padding: 8px;
  .title {
    font-weight: bold;
    line-height: 24px;
    font-size: 14px;
    color: #263238;
  }
}
.portfolio-detail {
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
  .seller {
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #CFD8DC;
  }
  .copy {
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #607D8B;
    border: 0.5px solid #607D8B;
    border-radius: 4px;
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
  .process-bar {
    width: 100%;
    display: flex;
  }
  .shares {
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    font-variant: small-caps;
    color: #78909C;
  }
  .process {
    background: #263238;
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
.tool {
  text-align: right;
  width: 100%;
  margin: 8px 0;
  
}
</style>
