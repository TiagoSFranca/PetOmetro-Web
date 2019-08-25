export default {
    getToken: (state) => {
        let tokenLocal = localStorage.getItem('token')
        let token = state.token
        if (token === null || token.length == 0) {
            token = tokenLocal
        }
        return tokenLocal
    },
    getRefreshToken: (state) =>{
        return state.tokenInfo.refresh_token
    }
}