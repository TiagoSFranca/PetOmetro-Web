import store from '@/store'
import Vue from 'vue'
import toastr from '@/utils/toastr'
import progressBar from '@/utils/progressBar'

// Lib imports
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:56986/api/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
if (store.state.auth.isAuth) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token
}
axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  let errorMessage = ''
  if (error.response !== undefined) {
    errorMessage = error.response.data.message
    let status = error.response.status
    console.log(status)
  } else {
    errorMessage = 'Ocorreu um erro...'
  }

  toastr.error(errorMessage)
  progressBar.show(false)
  return Promise.reject(error.response !== undefined ? error.response : error)
})

Vue.prototype.$http = axios
