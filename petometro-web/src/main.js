// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Axios from 'axios'
import StoreAuthConstants from '@/store/constants/auth'
import store from '@/store/store'

Vue.use(Vuetify, {
  theme: {
    primary: '#03a9f4',
    secondary: '#cddc39',
    accent: '#009688',
    error: '#f44336',
    warning: '#ffc107',
    info: '#607d8b',
    success: '#8bc34a'
  }
})

Axios.defaults.baseURL = process.env.API_ENDPOINT
if (store.getters[StoreAuthConstants.GETTERS.IS_AUTH]) {
  Axios.defaults.headers.common[StoreAuthConstants.STATES.TOKEN] = store.getters[StoreAuthConstants.GETTERS.TOKEN]
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
