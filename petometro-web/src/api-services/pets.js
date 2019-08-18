// import store from '@/store'
import axios from 'axios'

const RESOURCE_NAME = '/Pets'
export default {
  Get(source) {
    return axios.get(RESOURCE_NAME, {
      cancelToken: source.token
    })
      .then((response) => {
        var data = response.data
        console.log(data)
        // store.commit('auth/setIsAuth', true)
        // store.commit('auth/setToken', data.token)
        // store.commit('auth/setUserInfo', data)
      }).catch(() => {
      }).finally(() => {
        return true;
      })
  }
}