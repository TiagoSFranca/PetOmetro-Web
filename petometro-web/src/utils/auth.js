import store from '@/store'
export default {
    isAuth() {
        let token = store.getters['auth/getToken']
        if (token === null || token.length == 0) {
            store.dispatch('auth/logout')
            return false
        } else {
            store.dispatch('auth/setToken', token)
            return true
        }
    }
}