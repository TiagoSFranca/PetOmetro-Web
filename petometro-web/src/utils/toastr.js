import store from '@/store'

const timeout = 3000

function show (toastr) {
  store.commit('app/setToastr', toastr)
}

export default {
  success (text) {
    show({
      show: true,
      text: text,
      color: 'success',
      timeout: timeout
    })
  },
  error (text) {
    show({
      show: true,
      text: text,
      color: 'error',
      timeout: timeout
    })
  }
}
