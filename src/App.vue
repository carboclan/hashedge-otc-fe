<template>
  <div id="app">
    <div class="nav">
      <div class="brand">Hashedge</div>
      <ul class="nav-list">
        <li v-bind:class="{ active: $route.name === 'home' }">
          <a href="#/home">
            home
          </a>
        </li>
        <li v-bind:class="{ active: $route.name === 'market' }">
          <a href="#/market" v-on:click="resetCoinType">
            market
          </a>
        </li>
        <li v-bind:class="{ active: $route.name === 'portfolio' }">
          <a href="#/portfolio">
            portfolio
          </a>
        </li>
        <li v-bind:class="{ active: $route.name === 'balance' }">
          <a href="#/balance">
            balance
          </a>
        </li>
      </ul>
    </div>
    <LoginDialog />
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import LoginDialog from './components/ctrl/LoginDialog';
import { web3 } from './web3';

// define filters
Vue.filter('formatDate', function(value) {
  const format = 'MM.DD.YYYY';
  if (value >= 0) {
    return moment.unix(String(value)).format(format);
  }
});

Vue.filter('duration', function(value) {
  if (value < 60) {
    return '< 1 MIN'
  }
  if (value < 3600) {
    return `${parseInt(value/60)} MINS`
  }
  if (value < 3600 * 24) {
    return `${parseInt(value/3600)} HOURS`
  }
  if (value) {
    return `${parseInt(value/3600/60)} HOURS`
  }
});

Vue.filter('usd', function (value) {
  return (value/1e18).toFixed(6);
});

Vue.filter('btc', function (value) {
  return (value/1e18).toFixed(8);
});

Vue.filter('eth', function (value) {
  return (value/1e18).toFixed(8);
});

Vue.filter('bn', function (value) {
  return value.toNumber();
});

Vue.filter('tx', function (value) {
  return value.substr(0,40) + '...';
});

Vue.filter('percent', function (value) {
  return (value > 0 ? '+ ' : ' ') + value.toFixed(2) + '%';
});

export default {
  name: 'App',
  components: { LoginDialog },
  mounted () {
    if (!web3.eth.accounts[0]) {
      this.$store.commit('showDialog', { name: 'login-dialog', show: true});
    }
    this.$store.dispatch('getErc20List');
  },
  methods: {
    resetCoinType() {
      this.$store.commit('setCoinType', 'ALL');
    }
  }
}
</script>

<style lang="scss">
html, body {
  background-color: #455A64;
  margin: 0;
  padding: 0;
  height: 100%;
  vertical-align: middle;
}

#app {
  font-family: 'Roboto Condensed', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  height: 100%;

  >div:last-child {
    flex: 1 1 auto;
    max-width: 805px;
    color: white;
    padding: 0 16px 16px 0;
    // height: 100%;
    // overflow: scroll;

    >.title {
      height: 48px;
      line-height: 48px;
      margin: 84px 0 24px 0;
      font-size: 16px;
      letter-spacing: 0.05em;

      color: #ECEFF1;
    }
  }
}

.sep {
  height: 0!important;
  border-top: 1px solid #546E7A;
}

select {
  height: 24px;
  background: #263238;
  border-radius: 4px;
  line-height: 20px;
  font-size: 10px;
  letter-spacing: 0.015em;
  text-transform: uppercase;
  font-variant: small-caps;
  color: #607D8B;
  min-width: 80px;
}

button {
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  background: #263238;
  border-radius: 4px;
  height: 24px;
  color: #CFD8DC;
  border: none;
  min-width: 80px;
}

button:hover {
  background: #293939;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.left {
  float: left;
}
.right {
  float: right;
}
.text-right {
  text-align: right;
}

.help-mark {
    width: 20px;
    font-size: 20px;
    display: inline-block;
}

.tip-content {
  color:#78909C;
  line-height: 16px;
  padding: 10px;
  .tip-title {
    font-weight: bold;
    margin: 10px 0;
  }
}
</style>

<style scoped lang="scss">
.nav {
  flex: 0 1 auto;
  margin: 84px 56px;
  width: 221px;
  height: 189px;

  .brand {
    height: 48px;
    line-height: 48px;

    font-family: Eczar;
    font-size: 32px;
    letter-spacing: 0.06em;

    color: #ECEFF1;
  }

  .nav-list {
    list-style: none;
    margin: 21px 0 0 0;
    padding: 0;

    li {
      margin-bottom: 8px;
      height: 32px;
      line-height: 32px;
      font-size: 16px;

      a {
        display: flex;
        color: #90A4AE;
        text-decoration: none;

        > * {
          align-self: center;
          vertical-align: center;
        }

        .material-icons {
          padding: 8px;
          font-size: 16px;
          color: #90A4AE;
        }
      }

      &.active {
        a {
          color: #ECEFF1;
          // background-color: #263238;
          border-radius: 4px;
          .material-icons {
            color: #ECEFF1;
          }
        }
      }
    }
  }
}
</style>
