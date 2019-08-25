import store from '@/store'
import Vue from 'vue'
import axios from 'axios'
import { baseUrlApi } from "@/utils/constants"
import "@/middleware/axiosRequest"
import "@/middleware/axiosResponse"

axios.defaults.baseURL = baseUrlApi
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$http = axios
