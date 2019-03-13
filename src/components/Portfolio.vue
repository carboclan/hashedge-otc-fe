<template>
<div>
  <div class="title">My Portfolio</div>
  <!-- <div class="summary">
    <div>
      <div class="title">Total Liquidity Stake</div>
      <ul class="summary-detail">
        <li>
          <div class="label">TOTAL STAKE</div>
          <div class="content">Ξ 800.00</div>
        </li>
        <li class="sep"></li>
        <li>
          <div class="label">TOTAL CUMULATIVE DIVIDENDS PAID</div>
          <div class="content">Ξ 3.30</div>
        </li>
      </ul>
    </div>
    <div>
      <div class="title">Total Contract Token Investments</div>
      <ul class="summary-detail">
        <li>
          <div class="label">TOTAL HOLDINGS</div>
          <div class="content">Ξ 800.00</div>
        </li>
        <li></li>
      </ul>
    </div>
  </div>

  <div class="sep" style="margin: 15px 0;"></div> -->

  <PortfolioTable title="Portfolio"></PortfolioTable>
</div>
</template>

<script>
import PortfolioTable from './ctrl/PortfolioTable';

export default {
  name: 'Portfolio',
  components: {PortfolioTable}
}
</script>

<style scoped lang="scss">
.summary {
  display: flex!important;

  > div {
    flex: 1 1 auto;

    > .title {
      margin: 16px 0;
      font-size: 12px;
      letter-spacing: 0.01em;

      color: #ECEFF1;
    }

    &:first-child {
      margin-right: 16px;
    }
  }

  .summary-detail {
    background: #2a373e;
    border-radius: 4px;


    > li {
      display: flex;
      height: 48px;

      > div {
        flex: 1 1 auto;
        align-self: center;

        &.label {
          padding-left: 8px;
          font-size: 10px;
          letter-spacing: 0.06em;
          font-variant: small-caps;

          color: #90A4AE;
        }

        &.content {
          padding-right: 8px;
          text-align: right;
          font-family: Eczar;

        }
      }

    }
  }
}
</style>
