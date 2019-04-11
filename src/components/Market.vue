<template>
<div>
  <div class="title">Market</div>
  <ContractTable />
  <div class="create" v-on:click="showCreatDialog"><i class="material-icons">add</i></div>
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
  }
}
</script>

<style scoped lang="scss">
.create {
  position: fixed;
  text-align: center;
  line-height: 90px;
  right: 40px;
  bottom: 40px;
  width: 60px;
  height: 60px;
  border-radius: 40px;
  background-color: #263238;
  >i {
    font-size: 40px;
  }
}
</style>
