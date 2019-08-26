import axios from 'axios'
import router from '@/router'
import store from '@/store'
import toastr from '@/utils/toastr'
import progressBar from '@/utils/progressBar'
import { baseUrlAuth, clientId } from '@/utils/constants'
import mensagens from '@/utils/messages'

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
                if (!store.state.auth.isRefreshing) {
                    store.commit('auth/setIsRefreshing', true)

                    let formData = new FormData();
                    formData.append('client_id', clientId);
                    formData.append('grant_type', 'refresh_token')
                    formData.append('refresh_token', store.getters['auth/getRefreshToken'])

                    return axios.post(baseUrlAuth + '/token',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(response => {
                            var data = response.data
                            store.dispatch('auth/refreshToken', data)
                            return axios(error.response.config);
                        }).catch(error => {
                            store.dispatch('auth/logout')
                            router.push({ path: '/login' })
                            store.commit('auth/setIsRefreshing', false)
                            return Promise.reject(error);
                        }).finally(() => {
                            store.commit('auth/setIsRefreshing', false)
                        });
                }
            }
        } else {
            errorMessage = mensagens.erroConexao
        }
        toastr.error(errorMessage)
        progressBar.show(false)
    }
    return Promise.reject(error.response !== undefined ? error.response : error)
})