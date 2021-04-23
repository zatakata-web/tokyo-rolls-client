<template>
  <div id="app">
    <div v-if="isAuth">
      <v-navbar :navList="navItems" />
      <div class="container-fluid">
        <router-view />
      </div>
    </div>
    
    <div v-else class="login">
      <div class="login__block">
        <input type="password" class="login__password" placeholder="Пароль" v-model="password">
        <button class="login__btn btn btn-light" @click="login">Войти</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import vNavbar from './components/v-navbar'

export default {
  name: 'App',
  components: {
    vNavbar
  },
  data: () => ({
    isAuth: false,
    password: null,
    navItems: [
      { name: 'Склад', to: '/' },
      { name: 'Продажи', to: '/orders' },
      { name: 'Продукты', to: '/products' },
      { name: 'Роллы', to: '/rolls' },
      { name: 'Создать заказ', to: '/create-order' },
    ]
  }),
  methods: {
    ...mapActions(['loadRolls', 'loadStorage', 'loadOrders', 'loadProducts']),
    init() {
      this.loadRolls()
      this.loadStorage()
      this.loadOrders()
      this.loadProducts()
    },
    async login() {
      const res = await axios.post('https://tokyo-rolls.herokuapp.com/api/auth/login', {password: this.password})
      this.isAuth = res.data
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss">
  #app {
    height: 100vh;
  }
  .container-fluid {
    height: 94%;
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #343a40;
    &__block {
      display: flex;
    }
    &__password {
      width: 12rem;
      margin-right: .5rem;
    }
  }
</style>
