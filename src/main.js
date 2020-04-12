import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from './filters/data.filter'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

firebase.initializeApp({
  apiKey: "AIzaSyASR_0kM0gxJOwDsulc8tGkl9EjxcY9J3E",
  authDomain: "vue-crm-start.firebaseapp.com",
  databaseURL: "https://vue-crm-start.firebaseio.com",
  projectId: "vue-crm-start",
  storageBucket: "vue-crm-start.appspot.com",
  messagingSenderId: "1051728291585",
  appId: "1:1051728291585:web:719cee00ff6e9c6c011d00",
  measurementId: "G-PPP0M57YTP"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

