<template>
<div>
  <div class="title">Home</div>
  <TokenTable title="Proposals" v-bind:data="proposals"></TokenTable>
  <div class="create" v-on:click="showCreatDialog"><i class="material-icons">add</i></div>
  <CreateDialog></CreateDialog>
</div>
</template>

<script>
import { web3, hashedgeContracts } from '../web3';
import TokenTable from './ctrl/TokenTable';
import { DialogEventBus } from './ctrl/DialogContainer';
import CreateDialog from './ctrl/CreateDialog';

export default {
  name: 'Home',
  components: { TokenTable, CreateDialog },
  methods: {
    async showCreatDialog() {
      DialogEventBus.$emit('show-create-dialog');
    },
    async reload() {
      // this.$data.proposals = await listExchanges();
    }
  },
  mounted() {
    this.reload();
  },
  data() {
    return {
      proposals: []
    };
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
