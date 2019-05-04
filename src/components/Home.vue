<template>
<div>
  <div class="title">Home</div>
  <TokenTable title="Proposals" v-bind:data="proposals"></TokenTable>
  <div class="create" v-on:click="showCreatDialog">ISSUE NEW CONTRACT</div>
  <CreateDialog></CreateDialog>
</div>
</template>

<script>
import { web3, hashedgeContracts } from '../web3';
import TokenTable from './ctrl/TokenTable';
import CreateDialog from './ctrl/CreateDialog';

export default {
  name: 'Home',
  components: { TokenTable, CreateDialog },
  methods: {
    showCreatDialog() {
      this.$store.commit('showDialog', { name: 'create-dialog', show: true});
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

<style scoped lang="scss">
.create {
  position: fixed;
  text-align: center;
  padding: 0 20px;
  line-height: 40px;
  right: 40px;
  bottom: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #263238;
  font-size: 14px;
}
</style>
