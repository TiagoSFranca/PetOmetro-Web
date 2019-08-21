import authUtil from '@/utils/auth'
import toastr from '@/utils/toastr'

export default function auth({ from, next, router }) {
  let isAuth = authUtil.isAuth()
  if (!isAuth) {
    toastr.error('Autenticação necessária')
    if (from.path !== '/login') {
      return router.push({ path: '/login' })
    } else {
      return
    }
  }
  return next()
}
