import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ESBus from './plugins/esbus'
import Binance from './plugins/binance'
export const bus = new ESBus()

const emitter = new ESBus()
const ws = new Binance('BNBBTC', emitter)

Vue.config.productionTip = false
new Vue({
  router,
  data: {
    plugins: [ws]
  },
  render: h => h(App)
}).$mount('#app')
