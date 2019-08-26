import authUtil from '@/utils/auth'

export default function auth({ from, next, router }) {
  let isAuth = authUtil.isAuth()
  if (isAuth) {
    if (from.path === '/login' || from.path === '/' || from.path === '/register') {
      return router.push({ path: '/dashboard' })
    } else {
      return
    }
  }
  return next()
}
