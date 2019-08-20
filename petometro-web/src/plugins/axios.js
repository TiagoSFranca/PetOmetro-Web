import store from '@/store'
import Vue from 'vue'
import toastr from '@/utils/toastr'
import progressBar from '@/utils/progressBar'
import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = 'http://localhost:56986/api/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

if (store.state.auth.isAuth) {
  console.log(store.state.auth.token)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token
}

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (axios.isCancel(error)) {
    console.log('cancelado')
  } else {
    console.log(store)
    console.log(error)
    let errorMessage = ''
    if (error.response !== undefined) {
      if (error.response.status === 401) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message
        } else {
          errorMessage = 'Autenticação necessária'
        }
        store.commit('auth/setIsAuth', false)
        router.push({ path: '/login' })
      } else {
        errorMessage = error.response.data.message
      }
    } else {
      errorMessage = 'Ocorreu um erro...'
    }
    toastr.error(errorMessage)
    progressBar.show(false)
  }
  return Promise.reject(error.response !== undefined ? error.response : error)
})

Vue.prototype.$http = axios
