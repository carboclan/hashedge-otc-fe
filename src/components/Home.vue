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
