import authUtil from '@/utils/auth'
import toastr from '@/utils/toastr'
import mensagens from '@/utils/messages'

export default function auth({ from, next, router }) {
  let isAuth = authUtil.isAuth()
  if (!isAuth) {
    toastr.error(mensagens.autenticacaoNecessaria)
    if (from.path !== '/login') {
      return router.push({ path: '/login' })
    } else {
      return
    }
  }
  return next()
}
