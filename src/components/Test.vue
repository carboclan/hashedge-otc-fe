<template>
<div>
  <p>ERC20 Tokens:</p>
  <ul>
    <li v-for="erc20 of erc20Tokens" :key="erc20.address">
      <label>{{erc20.name}}</label>
      <input placeholder="address" size="40" v-model="erc20.mintAddress" />
      <button v-on:click="mint(erc20.address, erc20.mintAddress, 1000)">MINT1,000</button>
      <button v-on:click="mint(erc20.address, erc20.mintAddress, 1000000)">MINT1,000,000</button>
    </li>
  </ul>
  <p>Swap721 Tokens</p>
  <ul>
    <li v-for="erc721 of swap721Tokens" :key="erc721.address">
      <label>{{erc721.name}}</label>
      <input placeholder="address" size="40" v-model="erc721.whitelistAddress" />
      <button v-on:click="addWhitelisted(erc721.address, erc721.whitelistAddress)">Add to whitelist.</button>
    </li>
  </ul>
</div>
</template>

<script>
import { hashedgeContracts } from '../web3';

const erc20Tokens = [];
const swap721Tokens = [];

export default {
  name: 'Test',
  async mounted() {
    if (erc20Tokens.length === 0) {
      const addresses = Object.keys(hashedgeContracts.erc20Tokens);
      for (const address of addresses) {
        erc20Tokens.push({
          address,
          name: await hashedgeContracts.erc20Tokens[address].name()
        });
      }

      const addresses721 = Object.keys(hashedgeContracts.swap721Tokens);
      for (const address of addresses721) {
        swap721Tokens.push({
          address,
          name: await hashedgeContracts.swap721Tokens[address].name()
        });
      }
    }
  },
  methods: {
    mint(tokenAddr, mintAddr, value) {
      hashedgeContracts.erc20Tokens[tokenAddr].mint(mintAddr, value * 10 ** 18);
    },

    addWhitelisted(tokenAddr, whitelistAddr) {
      hashedgeContracts.swap721Tokens[tokenAddr].addWhitelisted(whitelistAddr);
    }
  },
  data() {
    return {
      erc20Tokens,
      swap721Tokens
    };
  }
}
</script>

<style scoped lang="scss">
.ttl {
  margin-top: 130px!important;
}

li {
  padding: 5px;
}
</style>
