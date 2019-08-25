import store from '@/store'

export default {
  show (show) {
    store.commit('app/setProgressCircular', show)
  }
}
