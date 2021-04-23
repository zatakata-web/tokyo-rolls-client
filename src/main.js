import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('unit', function (value, type) {
  switch (type) {
    case 'kg': 
      return `${value} кг.`
    case 'gr': 
      return `${value} г.`
    case 'thing': 
      return `${value} шт.`
  }
})

Vue.filter('composition', function (value) {
  return value.map(p => p.name.toLowerCase()).join(', ')
})

new Vue({
  router,
  store,
  render: (h) => h(App),
  el: '#app'
})
