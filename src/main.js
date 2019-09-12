import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ESBus from './plugins/esbus'
import Binance from './plugins/binance'
import './main.scss'

const Emitter = new ESBus()
const BinanceWS = new Binance('BTCUSDT', Emitter)

Vue.config.productionTip = false
new Vue({
  router,
  data() {
    return {
      plugins: [Emitter, BinanceWS]
    }
  },
  render: h => h(App)
}).$mount('#app')
