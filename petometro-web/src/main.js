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
import moment from 'moment'

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
