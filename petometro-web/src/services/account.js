import progressBar from '@/utils/progressBar'
import axios from 'axios'
import router from '@/router'
import toastr from '@/utils/toastr'

const RESOURCE_NAME = '/Account'

export default {
    Register(nome, email, senha, username) {
        let obj = {
            nome: nome,
            senha: senha,
            email: email,
            userName: username
        }

        progressBar.show(true)
        axios.post(RESOURCE_NAME + '/Register', JSON.stringify(obj))
            .then(() => {
                toastr.success('Cadastro realizado com sucesso.')
                progressBar.show(false)
                router.push({ path: '/login' })
            }).catch(() => {
            })
    }
}