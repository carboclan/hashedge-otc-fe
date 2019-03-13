<template>
<div>
  <div class="title">Balance</div>
  <BalanceTable />
</div>
</template>

<script>
import BalanceTable from './ctrl/BalanceTable';

export default {
  name: 'Balance',
  components: {BalanceTable}
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
}
</style>
