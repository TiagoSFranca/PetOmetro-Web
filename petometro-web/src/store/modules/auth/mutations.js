import { set, toggle } from '@/utils/vuex'

export default {
  setIsAuth: set('isAuth'),
  setToken: set('token'),
  setUserInfo: set('userInfo'),
  toggleIsAuth: toggle('isAuth'),
  setTokenInfo: set('tokenInfo'),
  setIsRefreshing: set('isRefreshing'),
  setShowLogout: set('showLogout')
}
