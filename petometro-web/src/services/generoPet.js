import axios from 'axios'
import store from '@/store'

const RESOURCE_NAME = '/GenerosPet'
export default {
  get(source) {
    axios.get(RESOURCE_NAME, {
      cancelToken: source.token
    })
      .then((response) => {
        var data = response.data
        store.commit('generoPet/setGeneros', data)
      }).catch(() => {
        return false
      }).finally(() => {
        return true;
      })
  }
}