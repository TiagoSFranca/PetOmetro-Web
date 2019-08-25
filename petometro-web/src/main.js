// Components
import './components'

// Plugins
import './plugins'
import vuetify from './plugins/vuetify'

// Sync router with store
import { sync } from 'vuex-router-sync'

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
