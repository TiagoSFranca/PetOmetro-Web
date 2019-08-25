import axios from 'axios'
import auth from '@/utils/auth'
import store from '@/store'

axios.interceptors.request.use(
    config => {
        let isAuth = auth.isAuth()
        if (isAuth) {
            config.headers.authorization = `Bearer ${store.state.auth.token}`
        } else {
            config.headers.authorization = ''
        }
        return config;
    },
    error => Promise.reject(error)
);