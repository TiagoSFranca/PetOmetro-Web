import axios from 'axios'
import progressBar from '@/utils/progressBar'
import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { paginacao } from '@/utils/constants/'

const RESOURCE_NAME = '/Pets'

function montarQueryFiltro(filtro) {
  let query = ''
  if (filtro) {
    if (filtro.nome)
      query += '&nome=' + filtro.nome
    if (filtro.especie)
      query += '&especie=' + filtro.especie
    if (filtro.raca)
      query += '&raca=' + filtro.raca
    if (filtro.idsGeneroPet)
      filtro.idsGeneroPet.forEach((element) => {
        query += '&idGeneros=' + element
      })

  }
  return query
}

function montarPaginacaoFiltro(filtro) {
  let query = ''
  if (filtro) {
    if (filtro.itensPorPagina)
      query += "&itensPorPagina=" + filtro.itensPorPagina
    else
      query += "&itensPorPagina=" + paginacao.MINIMO
    if (filtro.pagina)
      query += "&pagina=" + filtro.pagina
    else
      query += "&pagina=" + 1
  }
  else {
    query += "&itensPorPagina=" + paginacao.MINIMO
    query += "&pagina=" + 1
  }
  return query
}

export default {
  meusPets(source, dono, filtro, paginacao) {
    return this.get(`?meusPets=true&dono=${dono}`, source, filtro, paginacao)
  },
  get(query, source, filtro, paginacao) {
    let queryFiltro = montarQueryFiltro(filtro)
    let queryPaginacao = montarPaginacaoFiltro(paginacao);

    if (!query.startsWith('?'))
      query = '?' + query

    query += queryFiltro
    query += queryPaginacao

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