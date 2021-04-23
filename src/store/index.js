import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storage: [],
    rolls: [],
    products: [],
    orders: []
  },
  mutations: {
    SET_STORAGE(state, products) {
      state.storage = products
    },
    DELETE_STORAGE_ITEM(state, id) {
      state.storage = state.storage.filter(p => p._id !== id)
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_PRODUCT_TO_STORAGE(state, product) {
      state.storage = [product, ...state.storage] 
    },
    UPDATE_PRODUCT_TO_STORAGE(state, product) {
      const productId = state.storage.findIndex(p => p._id === product._id)
      state.storage.splice(productId, 1, product)
    },
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    async CREATE_ORDER_ITEM(state, order) {
      const usedProducts = []
      state.orders = [order, ...state.orders]
      order.rolls.forEach(r => {
        r.products.forEach(p => {
          const idx = state.storage.findIndex(storageItem => storageItem._id === p._id)
          state.storage[idx].value -= r.amount * p.value

          const usedProductIndex = usedProducts.findIndex(uProduct => uProduct._id === state.storage[idx]._id)
          if (usedProductIndex !== -1) {
            usedProducts[usedProductIndex] = state.storage[idx]
          } else {
            usedProducts.push(state.storage[idx])
          }
        })
      })

      await axios.put('https://tokyo-rolls.herokuapp.com/api/storage', usedProducts)
    },
    SET_ROLLS(state, rolls) {
      state.rolls = rolls
    },
    CREATE_ROLL_ITEM(state, roll) {
      state.rolls.push(roll)
    },
    DELETE_ROLL(state, id) {
      state.rolls = state.rolls.filter(r => r._id !== id)
    },
    CREATE_PRODUCT(state, product) {
      state.products.push(product)
    },
    DELETE_PRODUCT(state, id) {
      state.products = state.products.filter(p => p._id !== id)
    },
  },
  actions: {
    async loadStorage({commit}) {
      const response = await axios.get('https://tokyo-rolls.herokuapp.com/api/storage')
      const products = response.data
      commit('SET_STORAGE', products)
    },
    async deleteStorageItem({commit}, id) {
      await axios.delete(`https://tokyo-rolls.herokuapp.com/api/storage/${id}`)
      commit('DELETE_STORAGE_ITEM', id)
    },
    async loadProducts({commit}) {
      const response = await axios.get('https://tokyo-rolls.herokuapp.com/api/products')
      const products = response.data
      commit('SET_PRODUCTS', products)
    },
    async addProductToStorage({state, commit}, product) {
      const productIndex = state.storage.findIndex(p => p.name === product.name)
      if (productIndex != -1) {
        const changeProduct = {...state.storage[productIndex]}
        changeProduct.date = product.date
        changeProduct.price += product.price
        changeProduct.cost += product.cost
        changeProduct.value += product.value
        const response = await axios.patch('https://tokyo-rolls.herokuapp.com/api/storage', changeProduct)
        const updatedProduct = response.data
        commit('UPDATE_PRODUCT_TO_STORAGE', updatedProduct)
      }
      else {
        const response = await axios.post('https://tokyo-rolls.herokuapp.com/api/storage', product)
        const createdProduct = response.data
        commit('ADD_PRODUCT_TO_STORAGE', createdProduct)
      }
    },
    async loadOrders({commit}) {
      const response = await axios.get('https://tokyo-rolls.herokuapp.com/api/orders')
      const orders = response.data
      commit('SET_ORDERS', orders)
    },
    async createOrderItem({commit}, order) {
      const response = await axios.post('https://tokyo-rolls.herokuapp.com/api/orders', order)
      const createdOrder = response.data
      commit('CREATE_ORDER_ITEM', createdOrder)
    },
    async loadRolls({commit}) {
      const response = await axios.get('https://tokyo-rolls.herokuapp.com/api/rolls')
      const rolls = response.data
      commit('SET_ROLLS', rolls)
    },
    async createRollItem({commit}, roll) {
      const response = await axios.post('https://tokyo-rolls.herokuapp.com/api/rolls', roll)
      const createdRoll = response.data
      commit('CREATE_ROLL_ITEM', createdRoll)
    },
    async deleteRoll({commit}, id) {
      await axios.delete(`https://tokyo-rolls.herokuapp.com/api/rolls/${id}`)
      commit('DELETE_ROLL', id)
    },
    async createProduct({commit}, product) {
      const response = await axios.post('https://tokyo-rolls.herokuapp.com/api/products', product)
      const createdProduct = response.data
      commit('CREATE_PRODUCT', createdProduct)
    },
    async deleteProduct({commit}, id) {
      await axios.delete(`https://tokyo-rolls.herokuapp.com/api/products/${id}`)
      commit('DELETE_PRODUCT', id)
    },
  },
  getters: {
    storage(state) {
      return state.storage
    },
    orders(state) {
      return state.orders
    },
    rolls(state) {
      return state.rolls
    },
    products(state) {
      return state.products
    },
  }
})
