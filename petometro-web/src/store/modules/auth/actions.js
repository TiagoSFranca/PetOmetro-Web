export default {
    login({ commit }, data) {
        commit('setIsAuth', true)
        commit('setToken', data.token)
        commit('setUserInfo', data)
        localStorage.setItem('token', data.token)
    },
    setToken({ commit }, token) {
        commit('setIsAuth', true)
        commit('setToken', token)
        localStorage.setItem('token', token)
    },
    logout({ commit }) {
        commit('setIsAuth', false)
        commit('setToken', '')
        localStorage.setItem('token', '')
    }
}