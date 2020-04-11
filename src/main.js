import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// eslint-disable-next-line no-unused-vars
import dateFilter from './filters/data.filter'
import 'materialize-css/dist/js/materialize.min'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
