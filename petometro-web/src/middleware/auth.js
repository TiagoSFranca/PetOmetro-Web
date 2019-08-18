import store from '@/store'
import toastr from '@/utils/toastr'

export default function auth ({ from, next, router }) {
  if (!store.state.auth.isAuth) {
    toastr.error('Autenticação necessária')
    if(from.path !== '/login') {
      return router.push({ path: '/login' })
    } else {
      return
    }
  }
  return next()
}
