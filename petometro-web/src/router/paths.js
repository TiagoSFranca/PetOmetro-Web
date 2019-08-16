// Middlewares
import auth from '@/middleware/auth'
import guest from '@/middleware/guest'

export default [
  {
    path: '/login',
    view: 'Login',
    name: ' ',
    meta: {
      middleware: guest
    }
  },
  {
    path: '/pets',
    name: 'Pets',
    view: 'Pets',
    meta: {
      middleware: auth
    },
    children: [
      {
        path: '/',
        name: 'Todos',
        view: 'pets.Todos',
        meta: {
          middleware: auth
        }
      },
      {
        path: 'meus-pets',
        name: 'Meus Pets',
        view: 'pets.MeusPets',
        meta: {
          middleware: auth
        }
      }
    ]
  }
]
