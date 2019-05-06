<template>
<div>
  <div class="title">Market</div>
  <ContractTable />
  <div class="create" v-on:click="showCreatDialog">ISSUE NEW CONTRACT</div>
  <CreateDialog></CreateDialog>
</div>
</template>

<script>
import ContractTable from './ctrl/ContractTable';
import CreateDialog from './ctrl/CreateDialog';
export default {
  name: 'Market',
  components: {ContractTable, CreateDialog},
  methods: {
    showCreatDialog() {
      this.$store.commit('showDialog', { name: 'create-dialog', show: true});
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.$forceUpdate();
  }
}
</script>

<style scoped lang="scss">
.create {
  position: fixed;
  text-align: center;
  padding: 0 20px;
  line-height: 32px;
  right: 32px;
  bottom: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: #263238;
  font-size: 14px;
}
</style>
