import axios from 'axios'
import toastr from '@/utils/toastr'
import progressBar from '@/utils/progressBar'
import mensagens from '@/utils/messages'
import authService from '@/services/auth'

axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (axios.isCancel(error)) {
        console.log('cancelado')
    } else {
        let errorMessage = ''
        if (error.response !== undefined) {
            if (error.response.status !== 401) {
                errorMessage = mensagens.montarErroNao401(error);
            } else {
                return authService.refreshToken()
            }
        } else {
            errorMessage = mensagens.erroConexao
        }
        toastr.error(errorMessage)
        progressBar.show(false)
    }
    return Promise.reject(error.response !== undefined ? error.response : error)
})