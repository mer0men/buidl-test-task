import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ESBus from './plugins/esbus'
export const bus = new ESBus()
import Binance from './plugins/binance'


console.log(bus)
// Vue.use(binance)

const sk = new Binance('BNBBTC')

Vue.config.productionTip = false
new Vue({
  router,
  data: {
    plugins: [Binance]
  },
  render: h => h(App)
}).$mount('#app')
