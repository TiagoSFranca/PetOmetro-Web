import store from '@/store'
import toastr from '@/utils/toastr'

export default function auth ({ next, router }) {
  if (!store.state.auth.isAuth) {
    toastr.error('Autenticação necessária')
    return router.push({ path: '/login' })
  }
  return next()
}
