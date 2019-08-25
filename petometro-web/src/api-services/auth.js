import progressBar from '@/utils/progressBar'
import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { baseUrlAuth, clientId } from "@/utils/constants"

export default {
  Auth(username, password) {
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
        progressBar.show(false)
        router.push({ path: '/dashboard' })
      }).catch(() => {
      })
  }
}
