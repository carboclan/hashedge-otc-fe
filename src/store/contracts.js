import { Web3Wrapper } from '@0x/web3-wrapper';
import { getWrappers } from '@hashedge/contract-wrapper';
import abi from '../web3/abi.json';

export default {
  namespaced: true,
  state: {
    msg: '',
    error: false,
    critical: false
  },
  mutations: {
    setContracts(state, contracts) {
      state.contracts = contracts;
    },
    setWeb3Wrapper(state, web3Wrapper) {
      state.web3Wrapper = web3Wrapper;
    },
    setAccount(state, addr) {
      state.account = addr;
    },
    setMessage(state, msg) {
      state.msg = msg.msg || msg;
      state.error = false;
      state.critical = msg.critical;
    },
    setError(state, error) {
      state.msg = error.msg || error;
      state.error = true;
      state.critical = error.critical;
    },
    clearMessage(state) {
      state.msg = '';
      state.error = false;
      state.critical = false;
    }
  },
  actions: {
    async init(ctx) {
      ctx.commit('setMessage', { msg: 'Connecting to metamask...', critical: true });

      const { ethereum } = window;

      if (!ethereum) return ctx.commit('setError', { msg: 'No metamask...', critical: true });

      try {
        const accounts = await ethereum.enable();
        const web3Wrapper = new Web3Wrapper(ethereum);
        const networkId = await web3Wrapper.getNetworkIdAsync();
        // ropsten
        if (networkId !== 3) return ctx.commit('setError', { msg: 'Please switch to ropsten network', critical: true });

        ctx.commit('setAccount', accounts[0]);
        ctx.commit('setWeb3Wrapper', web3Wrapper);
        ctx.commit('setContracts', getWrappers(abi, ethereum));

        ctx.commit('clearMessage');
      } catch (e) {
        console.error(e);
        ctx.commit('setError', { msg: e.message || e.toString(), critical: true });
      }
    }
  }
};
