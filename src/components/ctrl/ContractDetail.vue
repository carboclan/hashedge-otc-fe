<template>
  <div class="right-panel">
    <div class="title">selected contract details</div>
    <div class="contract-detail">
      <div class="detail-header">
        <div class="quantity">
          <span>EnterQuantity</span>
          <input placeholder="450" />
        </div>
        <div class="tip">TOTAL PRICE</div>
        <div class="large-price">$2092.50</div>
        <div class="memo">BTC 0.54510002</div>
        <div class="tool"><button>BUY</button></div>
      </div>
      <div class="spacer"></div>
      <div class="detail-cell">
        <div>
          <div class="tip">QUANTITY AVALABLE</div>
          <div class="small-price">1,100</div>
          <div class="memo">of 2000 Units</div>
        </div>
        <div>
          <div class="tip">CONTRACT UNIT PRICE</div>
          <div class="small-price">$4.65/TH</div>
          <div class="memo">BTC 0.0012/TH</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-cell">
        <div>
          <div class="tip">START PRICE</div>
          <div class="small-price">$6.50/TH</div>
          <div class="memo">Today</div>
        </div>
        <div>
          <div class="tip">RESERVATION PRICE</div>
          <div class="small-price">$4.50/TH</div>
          <div class="memo">02.15.2019</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-footer">
          <div class="tip">EXPECTED OUTPUT CALCULATOR</div>
          <div class="large-price">$360.00</div>
          <div class="memo">BTC 0.2451 OR ETH 6.287</div> 
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ContractDetail',
  data() {
    return {
      contract: null
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
