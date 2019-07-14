<template>
<DialogContainer v-if="show" extra-class="deposit-dialog">
  <div class="title">
    deposit
  </div>
  <section v-show="step==0">
    <div class="input-group">
      <div class="quantity">
        <span>amount to deposit</span>
        <input placeholder="amount" v-model="amount" />
      </div>
    </div>
    <div class="input-group">
      <div class="quantity">
        <span>deposit address</span>
        <input class="address" placeholder="address" v-model="contractAddress" disabled />
      </div>
    </div>
  </section>
  <section v-show="step==1">
    <div class="title"> Please finish next steps in Metamask</div>
  </section>
  <div class="footer">
    <button v-on:click="hide">CANCEL</button>
    <button v-on:click="submit">OK</button>
  </div>
</DialogContainer>
</template>

<script>
import { web3, hashedgeContracts } from '../../web3';
import DialogContainer from './DialogContainer';

export default {
  name: 'DepositDialog',
  components: { DialogContainer },
  mounted() {
    this.$data.contractAddress = this.$store.state.dialog.params;
  },
  methods: {
    hide() {
      this.$store.commit('hideDialog');
    },
    async submit() {
      this.$data.step = 1;
      const { amount } = this.$data;
      const contractAddress = this.$store.state.dialog.params;

      const colContract = this.$store.state.contracts.getContract(contractAddress);
      const underlying = await colContract.underlying.callAsync();
      const tokenContract = this.$store.state.contracts.getContract(underlying);
      this.$store.dispatch('contracts/pushTransaction', {
        contract: tokenContract, method: 'approve',
        args: [contractAddress, web3.toWei(amount, 'ether')],
        check: true
      });
      this.$store.dispatch('contracts/pushTransaction', {
        contract: colContract, method: 'deposit',
        args: [web3.toWei(amount, 'ether')],
        check: true
      });

      const error = await this.$store.state.contracts.waitPendingTransactions();
      if (!error) this.$data.steps = 0;
      this.$store.commit('hideDialog');
    }
  },
  data() {
    return {
      amount: 0,
      step: 0,
    };
  },
  computed: {
    contractAddress: function() { return this.$store.state.dialog.params },
    show: function() { return (this.$store.state.dialog.name === 'deposit-dialog') },
  }
}
</script>

<style lang="scss">
.deposit-dialog {
  .dialog-container {
    width: 432px;
    background-color: #37474F;
  }
  .title {
    line-height: 24px;
    font-size: 17px;
    color: white;
    margin: 8px 0;
  }
  .input-group {
    padding: 8px;
    select {
      background-color: #263238;
      font-size: 14px;
      line-height: 24px;
      min-width: 49%;
      margin-bottom: 16px;
      color: #CFD8DC;
    }
    .date-input {
      font-size: 14px;
      line-height: 24px;
      min-width: 49%;
      margin-bottom: 16px;
      background: #263238;
      border: 1px solid #CFD8DC;
      box-sizing: border-box;
      color: #CFD8DC;
      border-radius: 4px;
    }
    textarea {
      width: 100%;
      height: 100px;
      background: #455A64;
      border: 0.25px solid #607D8B;
      box-sizing: border-box;
      border-radius: 4px;
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
  .foot-note {
    position: relative;
    top: -16px;
    font-size: 12px;
    color: #B0BEC5;
    text-align: right;
  }
  .quantity {
    background: #263238;
    border-bottom: 1px solid #CFD8DC;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
    padding: 8px;
    height: 56px;
    margin-bottom: 16px;
    >span {
      font-size: 12px;
      color: #B0BEC5;
    }
    >input {
      font-family: Roboto Condensed;
      margin: 8px;
      line-height: 24px;
      font-size: 18px;
      text-align: right;
      color: white;
      width: 95%;
      float: right;
      background: none;
      border: none;
    }
  }
  .spacer {
    width: 100%;
    border: 0.5px solid #263238;
  }
  .footer {
    background: #263238;
    border-radius: 0px 0px 4px 4px;
    height: 36px;
    text-align: right;
  }
}
</style>
