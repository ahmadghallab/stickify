import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(require('vue-shortkey'), { prevent: ['input', 'textarea'] })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
