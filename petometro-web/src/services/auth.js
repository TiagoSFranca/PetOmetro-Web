import progressBar from '@/utils/progressBar'
import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { baseUrlAuth, clientId } from "@/utils/constants"

export default {
  auth(username, password) {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('client_id', clientId);
    formData.append('grant_type', 'password')

    progressBar.show(true)
    axios.post(baseUrlAuth + '/token',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        var data = response.data
        store.dispatch('auth/login', data);

        this.getUserInfo()

        progressBar.show(false)
        router.push({ path: '/dashboard' })
      }).catch(() => {
      })
  },
  getUserInfo() {
    if (store.state.auth.searchUserInfo) {
      store.commit('auth/setSearchUserInfo', false)
      axios.get(baseUrlAuth + '/userinfo')
        .then((response) => {
          var data = response.data
          store.dispatch('auth/setUserInfo', data);
        }).catch(() => {
        })
    }
  },
  logout() {
    store.dispatch('auth/logout');
    router.push({ path: '/login' })
  },
  refreshToken() {
    if (!store.state.auth.isRefreshing) {
      store.commit('auth/setIsRefreshing', true)

      let formData = new FormData();
      formData.append('client_id', clientId);
      formData.append('grant_type', 'refresh_token')
      formData.append('refresh_token', store.getters['auth/getRefreshToken'])

      return axios.post(baseUrlAuth + '/token',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          var data = response.data
          store.dispatch('auth/refreshToken', data)

          this.getUserInfo()

          return axios(error.response.config);
        }).catch(error => {
          store.dispatch('auth/logout')
          router.push({ path: '/login' })
          store.commit('auth/setIsRefreshing', false)
          return Promise.reject(error);
        }).finally(() => {
          store.commit('auth/setIsRefreshing', false)
        });
    }
  }
}
