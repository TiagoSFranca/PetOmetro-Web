import AuthService from '@/services/auth'

export default {
    login({ commit }, data) {
        commit('setIsAuth', true)
        commit('setToken', data.access_token)
        commit('setTokenInfo', data)
        localStorage.setItem('token', data.access_token)
    },
    setToken({ commit }, token) {
        commit('setIsAuth', true)
        commit('setToken', token)
        localStorage.setItem('token', token)
        AuthService.GetUserInfo()
    },
    logout({ commit }) {
        commit('setIsAuth', false)
        commit('setSearchUserInfo', true)
        commit('setToken', '')
        localStorage.setItem('token', '')
    },
    refreshToken({ commit }, data) {
        commit('setIsAuth', true)
        commit('setToken', data.access_token)
        commit('setTokenInfo', data)
        localStorage.setItem('token', data.access_token)
    },
    setUserInfo({ commit }, data) {
        data.id = parseInt(data.sub)
        commit('setUserInfo', data)
    }
}