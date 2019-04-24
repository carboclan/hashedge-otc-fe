import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Market from '@/components/Market'
import Balance from '@/components/Balance'
import Portfolio from '@/components/Portfolio'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/market',
      name: 'market',
      component: Market
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '/balance',
      name: 'balance',
      component: Balance
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
