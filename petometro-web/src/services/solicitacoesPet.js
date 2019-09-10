import axios from 'axios'
import store from '@/store'
import progressBar from '@/utils/progressBar'
import toastr from '@/utils/toastr'
import messages from '@/utils/messages'

const RESOURCE_NAME = '/SolicitacoesPet'

export default {
    getEnviadas(source, ) {
        var idSolicitante = store.state.auth.userInfo.id
        return this.get(`?idSolicitantes=${idSolicitante}`, source)
    },
    getBySolicitante(source, pet) {
        var idSolicitante = store.state.auth.userInfo.id
        return axios.get(RESOURCE_NAME + `?idSolicitantes=${idSolicitante}&idPets=${pet}`, {
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
    get(query, source) {
        return axios.get(RESOURCE_NAME + query, {
            cancelToken: source.token
        })
            .then((response) => {
                var data = response.data
                store.dispatch('solicitacaoPet/adicionar', data);
                store.commit('solicitacaoPet/setConsultar', false);
                return true
            }).catch(() => {
                return false
            }).finally(() => {
                return true;
            })
    },
    adicionar(idUsuario, idPet) {
        let obj = {
            IdUsuarioSolicitado: idUsuario,
            IdPet: idPet
        }
        progressBar.show(true)
        return axios.post(RESOURCE_NAME, JSON.stringify(obj))
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
    },
    excluir(idSolicitacao) {
        progressBar.show(true)
        return axios.delete(RESOURCE_NAME + "/" + idSolicitacao)
            .then(() => {
                console.log('aqio')
                toastr.success(messages.sucesso.exclusao)
                progressBar.show(false)
                store.commit('solicitacaoPet/setConsultar', true)
                return true
            }).catch(() => {
                return false
            }).finally(() => {
                return true
            })
    }
}