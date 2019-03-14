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
import { DialogEventBus } from './ctrl/DialogContainer';
import CreateDialog from './ctrl/CreateDialog';
export default {
  name: 'Market',
  components: {ContractTable, CreateDialog},
  methods: {
    showCreatDialog() {
      DialogEventBus.$emit('show-create-dialog');
    },
  }
}
</script>

<style scoped>
.create {
  position: fixed;
  text-align: center;
  line-height: 50px;
  right: 50px;
  bottom: 50px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #263238;
}
</style>
