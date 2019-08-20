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
    let formData = new FormData();
    for (var key in obj) {
      console.log(key)
      formData.append(key, obj[key]);
    }
    progressBar.show(true)
    return axios.post(RESOURCE_NAME,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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