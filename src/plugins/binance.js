export default class Binance {
  constructor (symbol, emitter) {
    this.symbol = symbol
    this.emitter = emitter
    this.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`)
    this.socket.onopen = () => {
      console.log('Connected')
      this.emitter.emit('connectionOpend', null)
    }

    this.socket.onmessage = (msg) => {
      let data = JSON.parse(msg.data)
      console.log('Message from socket', data)
      this.emitter.emit('dataUpdated', data)
    }

    this.socket.onclose = (event) => {
      console.log('Conection closed', event)
      this.emitter.emit('connectionClosed', null)
    }

    this.socket.onerror = (err) => {
      console.log('ERROR:', err)
      this.emitter.emit('error', err)
    }
  }

  changeSymbol (symbol) {
    this.symbol = symbol
    this.socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`)
    this.emitter.emit('symbolChanged', symbol)
  }

  getData = async () => {
    await (await fetch(`https://cors-anywhere.herokuapp.com/www.binance.com/api/v1/depth?${this.symbol.toLowerCase()}=BNBBTC&limit=500`)).json()
      .then(data => this.emitter.emit('getData', data))
      .catch(err => console.log(err))
  }
}
