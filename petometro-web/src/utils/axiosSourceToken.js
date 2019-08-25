import axios from 'axios'

export default {
    ObterToken () {
        let CancelToken = axios.CancelToken;
        return CancelToken.source();        
    }
}