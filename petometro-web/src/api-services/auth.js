import progressBar from '@/utils/progressBar'
import store from '@/store'
import axios from 'axios'

const RESOURCE_NAME = '/Usuarios'

export default {
  Auth (username, password, keep) {
    let obj = {
      Login: username,
      Senha: password,
      KeepConnected: keep
    }
    progressBar.show(true)
    axios.post(RESOURCE_NAME + '/auth', JSON.stringify(obj))
      .then((response) => {
        console.log(response)
        var data = response.data
        store.commit('auth/setIsAuth', true)
        store.commit('auth/setToken', data.token)
        store.commit('auth/setUserInfo', data)
        progressBar.show(false)
      }).catch(() => {
      })
  }
}
