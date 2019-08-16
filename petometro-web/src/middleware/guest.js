import store from '@/store'

export default function auth ({ from, next, router }) {
  if (store.state.auth.isAuth) {
    if (from.path === '/login' || from.path === '/') {
      return router.push({ path: '/dashboard' })
    } else {
      return
    }
  }
  return next()
}
