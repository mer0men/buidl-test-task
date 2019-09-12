<template>
  <div class="dropdown">
    <p class="dropdown__label">{{ symbol }}</p>
    <div class="dropdown-content">
      <span @click="changeSymbol('BTCUSDT')" class="dropdown-content__item">BTCUSDT</span>
      <span @click="changeSymbol('BNBBTC')" class="dropdown-content__item">BNBBTC</span>
      <span @click="changeSymbol('ETHBTC')" class="dropdown-content__item">ETHBTC</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      symbol: 'BTCUSDT'
    }
  },
  mounted() {
    this.$root.plugins[0].subscribe('symbolChanged', (symbol) => {
      this.symbol = symbol
    })
  },
  methods: {
    changeSymbol(symbol) {
      console.log('asd')
      this.$root.plugins[1].changeSymbol(symbol)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../main.scss';

.dropdown {
  position: relative;
  height: 50px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $secondary;
  cursor: pointer;
  
  &__label {
    font-size: 18px;
    text-align: center;
  }

  &:hover .dropdown-content {    
    display: flex;
  }

  .dropdown-content {
    position: absolute;
    bottom: 0;
    width: inherit;
    height: 0;
    display: none;
    flex-direction: column;
    transition: 0.4s;
    z-index: 2;
    cursor: pointer;

    &__item {
      width: inherit;
      height: 50px;
      background: $secondary-light;
      transition: 0.3s;
      padding: 10px 0;
      text-align: center;
      

      &:hover {
        background: $secondary-dark;
      }      
    }

  }
}
</style>