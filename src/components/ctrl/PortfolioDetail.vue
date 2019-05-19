<template>
  <div class="right-panel">
    <div class="title">selected contract details</div>
    <div class="portfolio-detail">
      <div class="detail-header">
        <div class="tip">PROGRESS</div>
        <div class="large-price">{{getProcessed(portfolio.startTime, portfolio.endTime) | duration}}/{{portfolio.duration | duration}}</div>
        <div class="process-bar">
            <div><div class="shares">{{Number(portfolio.startTime) | formatDate}}</div></div>
            <div class="process"><div class="bar" v-bind:style="{width: getProcessed(portfolio.start,portfolio.total) * 155/portfolio.total + 'px'}"></div></div>
            <div><div class="shares">{{Number(portfolio.endTime) | formatDate}}</div></div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-header">
        <div class="seller">Your are Contract {{portfolio.type}}</div>
      </div>
      <div class="spacer"></div>
      <div class="detail-header">
        <div class="tip">ESTIMATED NET GAIN</div>
        <div class="large-price">{{portfolio.estimateNetGain | percent}}</div>
      </div>
      <div class="spacer"></div>
      <div class="detail-cell">
        <div>
          <div class="tip">TOTAL RECEIVED</div>
          <div class="small-price">{{portfolio.received | eth}}</div>
          <div class="memo">{{portfolio.rUnit}}</div>
        </div>
        <div>
          <div class="tip">TOTAL PAID</div>
          <div class="small-price">{{portfolio.paid | usd}}</div>
          <div class="memo">{{portfolio.pUnit}}</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-cell" v-if="portfolio.priceUSD > 0">
        <div>
          <div class="tip">AMOUNT</div>
          <div class="small-price">{{portfolio.contractSize}}</div>
          <div class="memo">{{portfolio.unit}}</div>
        </div>
        <div>
          <div class="tip">PRICE</div>
          <div class="small-price">{{portfolio.priceUSD | usd}}</div>
          <div class="memo">{{portfolio.pUnit}}</div>
        </div>
      </div>
      <div class="spacer"></div>
      <div class="detail-footer">
          <div class="tip">TXID: {{portfolio.tx | tx}}</div>
          <div class="copy">COPY</div>
      </div>
    </div>
    <div class="tool" v-if="portfolio.type === 'Buyer'" v-on:click="sell"><button>Sell</button></div>
    <div class="tool" v-if="portfolio.type === 'Seller'"><button v-show="portfolio.status === 1"  v-on:click="settle">SETTLE</button><button v-show="portfolio.status === 0" v-on:click="cancel">CANCEL</button></div>
  </div>
</template>
<script>

import { web3, hashedgeContracts } from '../../web3';
import moment from 'moment';
import ClipboardJS from 'clipboard';
import { assetDataUtils } from '0x.js';
import { waitForInit, createAuction, bidAuction } from '../../web3/0x';

export default {
  name: 'PortfolioDetail',
  props: {
    portfolio: Object
  },
  mounted() {
    const { portfolio } = this.$props;
    this.$data.clipboard = new ClipboardJS('.copy', {
      text: function() {
          return portfolio.tx;
      }
    });
    this.$data.clipboard.on('success', function(e) {
      alert('tx hash has copied to clipboard');
    });
  },
  beforeDestory() {
    this.$data.clipboard.destory();
  },
  methods: {
    getProcessed(start, end) {
      if (start === 0) {
        return 0
      }
      if (Number(moment().unix) > end) {
        return end - start;
      }
      return Number(moment().unix - start)
    },
    async sell() {
      console.log(this.portfolio);
      alert(`Contract will be sold at price: ${(this.portfolio.priceUSD / 1e18).toFixed(8)}DAI`);
      await waitForInit();
      // // const { portfolio } = this.$props;
      // // recpt = await hashedgeFactory.sell(portfolio.address);
      // // await web3.eth.getTransactionReceipt(recpt);
      // recpt = await web3.eth.sendTransaction({
      //   to: '0xf747DA315F3868622D5828Fd49FbD247109Edf43',
      //   value: 100});
      // await web3.eth.getTransactionReceipt(recpt);
      const erc721Address = this.portfolio.address;
      const erc721 = hashedgeContracts.swap721Tokens[erc721Address];
      const erc20Address = await erc721.fixLegToken();

      const order = await createAuction(erc721, this.portfolio.id, erc20Address, this.portfolio.priceUSD, 3600 * 24);
      this.$store.commit('pushOrder', { portfolio: this.portfolio, order });
      console.log(order);
    },
    async cancel() {
      const { portfolio } = this.$props;
      const recpt = await hashedgeContracts.swap721Tokens[portfolio.address].cancel([portfolio.id]);
      await web3.eth.getTransactionReceipt(recpt);
      this.$store.dispatch('getPortfolioList');
    },
    async settle() {
      const { portfolio } = this.$props;
      const recpt = await hashedgeContracts.swap721Tokens[portfolio.address].settle([portfolio.id]);
      await web3.eth.getTransactionReceipt(recpt);
      this.$store.dispatch('getPortfolioList');
    }
  },
  data() {
    return {
    };
  }
}
</script>

<style lang="scss">
.right-panel {
  position: absolute;
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
    width: 155px;
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
.tool {
  text-align: right;
  width: 100%;
  margin: 8px 0;
  >button {
    margin-left: 10px;
  }

}
</style>
