import axios from 'axios'
import store from '@/store'
import progressBar from '@/utils/progressBar'
import toastr from '@/utils/toastr'

const RESOURCE_NAME = '/SolicitacoesPet'
export default {
    GetBySolicitante(source, pet) {
        var idSolicitante = store.state.auth.userInfo.id
        return this.Get(`?idSolicitantes=${idSolicitante}&idPets=${pet}`, source)
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
    Adicionar(idUsuario, idPet) {
        let obj = {
            IdUsuarioSolicitado: idUsuario,
            IdPet: idPet
        }
        progressBar.show(true)
        return axios.post(RESOURCE_NAME, JSON.stringify(obj))
            .then(() => {
                toastr.success('Operação realizada com sucesso!')
                progressBar.show(false)
                return true
            }).catch(() => {
                return false
            }).finally(() => {
                return true
            })
    }
}