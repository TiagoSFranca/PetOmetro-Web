export default {
    adicionar({ commit }, data) {
        if (data.pagina) {
            commit('setPets', data)
        }
    },
}