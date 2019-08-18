import axios from 'axios'

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
  }
}