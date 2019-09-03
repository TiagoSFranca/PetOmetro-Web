import axios from 'axios'

export default {
    obterToken() {
        let CancelToken = axios.CancelToken;
        return CancelToken.source();
    }
}