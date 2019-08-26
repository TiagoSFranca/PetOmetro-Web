import axios from 'axios'
import progressBar from '@/utils/progressBar'
import toastr from '@/utils/toastr'
import store from '@/store'

const RESOURCE_NAME = '/Pets'

export default {
  MeusPets(source, dono) {
    return this.Get('?meusPets=true&dono=' + dono, source)
  },
  Get(query, source) {
    return axios.get(RESOURCE_NAME + query, {
      cancelToken: source.token
    })
      .then((response) => {
        var data = response.data
        store.dispatch('pet/adicionar', data);
        store.commit('pet/setConsultar', false)
        return true
      }).catch(() => {
        return false
      }).finally(() => {
        return true;
      })
  },
  Adicionar(obj) {
    let formData = new FormData();
    for (var key in obj) {
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
        store.commit('pet/setConsultar', true)
        return true
      }).catch(() => {
        return false
      }).finally(() => {
        return true
      })
  },
  Excluir(idPet) {
    progressBar.show(true)
    return axios.delete(RESOURCE_NAME + "/" + idPet)
      .then(() => {
        toastr.success('Operação realizada com sucesso!')
        progressBar.show(false)
        store.commit('pet/setConsultar', true)
        return true
      }).catch(() => {
        return false
      }).finally(() => {
        return true
      })
  }
}