// Lib imports
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Routes
import paths from './paths'

function route(path, view, name, meta, children) {
  if (children) {
    children = children.map(child => route(child.path, child.view, child.name, child.meta, null))
  }
  if (view) {
    view = view.replace('.', '/')
  }
  return {
    name: name || view,
    path,
    component: (resovle) => import(
      `@/views/${view}.vue`
    ).then(resovle),
    meta: meta,
    children: children
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name, path.meta, path.children)).concat([
    { path: '*', redirect: '/login' }
  ]),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    context.next(...parameters)
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }
  return next()
})

Vue.use(Meta)

export default router
