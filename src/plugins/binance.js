import bus from '../main'

export default class Binance {
  constructor(symbol) {
    this.symbol = symbol,
    this.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth`)
    this.socket.onopen = () => {
      console.log('Connected')
      bus.emit('connected', 'blabla')
    }

    this.socket.onmessage = (msg) => {
      let data = JSON.parse(msg.data)
      return console.log('Message from socket', data)
      bus.emit('dataUpdated', data)
    }
    
    this.socket.onclose = (event) => {
      console.log('Conection closed', event)
      
    this.socket.onerror = (err) => {
      console.log('ERROR:', err)
    }    
  }

  changeSymbol(symbol) {
    this.symbol = symbol
    this.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@depth`)      
  }

  getInfo =  async () => {
    await (await fetch(`https://cors-anywhere.herokuapp.com/www.binance.com/api/v1/depth?${this.symbol}=BNBBTC&limit=500`)).json()
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
}