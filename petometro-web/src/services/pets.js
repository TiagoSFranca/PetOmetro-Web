import axios from 'axios'
import progressBar from '@/utils/progressBar'
import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'

const RESOURCE_NAME = '/Pets'

export default {
  meusPets(source, dono) {
    return this.get('?meusPets=true&dono=' + dono, source)
  },
  get(query, source) {
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
  adicionar(obj) {
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
        toastr.success(messages.sucesso.cadastro)
        progressBar.show(false)
        store.commit('pet/setConsultar', true)
        return true
      }).catch(() => {
        return false
      }).finally(() => {
        return true
      })
  },
  editar(obj) {
    let formData = new FormData();
    for (var key in obj) {
      formData.append(key, obj[key]);
    }
    progressBar.show(true)
    return axios.put(RESOURCE_NAME + '/' + obj.id,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        toastr.success(messages.sucesso.edicao)
        progressBar.show(false)
        store.commit('pet/setConsultar', true)
        return true
      }).catch(() => {
        return false
      }).finally(() => {
        return true
      })
  },
  excluir(idPet) {
    progressBar.show(true)
    return axios.delete(RESOURCE_NAME + "/" + idPet)
      .then(() => {
        toastr.success(messages.sucesso.exclusao)
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