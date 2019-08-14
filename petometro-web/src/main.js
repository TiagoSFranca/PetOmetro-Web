import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import Axios from 'axios'

// Sync store with router
sync(store, router)

Axios.defaults.baseURL = 'http://localhost:56986/api/'
// if (store.getters[StoreAuthConstants.GETTERS.IS_AUTH]) {
//   Axios.defaults.headers.common[StoreAuthConstants.STATES.TOKEN] = store.getters[StoreAuthConstants.GETTERS.TOKEN]
// }

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
