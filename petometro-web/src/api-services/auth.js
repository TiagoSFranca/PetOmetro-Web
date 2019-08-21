import progressBar from '@/utils/progressBar'
import store from '@/store'
import axios from 'axios'
import router from '@/router'

const RESOURCE_NAME = '/Usuarios'

export default {
  Auth(username, password, keep) {
    let obj = {
      Login: username,
      Senha: password,
      KeepConnected: keep
    }
    progressBar.show(true)
    axios.post(RESOURCE_NAME + '/auth', JSON.stringify(obj))
      .then((response) => {
        var data = response.data
        store.dispatch('auth/login', data);
        progressBar.show(false)
        router.push({ path: '/dashboard' })
      }).catch(() => {
      })
  }
}
