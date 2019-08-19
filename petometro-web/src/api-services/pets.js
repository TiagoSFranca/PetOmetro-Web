import axios from 'axios'
import progressBar from '@/utils/progressBar'

const RESOURCE_NAME = '/Pets'
export default {
  MeusPets(source) {
    return this.Get('?meusPets=true', source)
  },
  Get(query, source) {
    return axios.get(RESOURCE_NAME + query, {
      cancelToken: source.token
    })
      .then((response) => {
        var data = response.data
        return data
      }).catch(() => {
        return false
      }).finally(() => {
        return true;
      })
  },
  Adicionar(obj) {
    progressBar.show(true)
    return axios.post(RESOURCE_NAME, JSON.stringify(obj))
      .then(() => {
        progressBar.show(false)
        return true
      }).catch(() => {
        return false
      }).finally(() => {
        return true
      })
  }
}