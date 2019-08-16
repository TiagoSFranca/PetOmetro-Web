import { set, toggle } from '@/utils/vuex'

export default {
  setIsAuth: set('isAuth'),
  setToken: set('token'),
  setUserInfo: set('userInfo'),
  toggleIsAuth: toggle('isAuth')
}
