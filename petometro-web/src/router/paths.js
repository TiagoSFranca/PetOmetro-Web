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
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
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
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  }
]
