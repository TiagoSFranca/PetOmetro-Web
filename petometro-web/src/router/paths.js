// Middlewares
import auth from '@/middleware/auth'
import guest from '@/middleware/guest'

export default [
  {
    path: '/login',
    view: 'Login',
    name: 'Login',
    meta: {
      middleware: guest
    }
  },
  {
    path: '/register',
    view: 'Register',
    name: 'Registrar',
    meta: {
      middleware: guest
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    view: 'Dashboard',
    meta: {
      middleware: auth
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
  },
  {
    path: '/pets/:id',
    name: 'Pet',
    view: 'pets.Info',
    meta: {
      middleware: auth
    }
  },
  {
    path: '/solicitacoes-pet',
    name: 'Solicitações Pet',
    view: 'Solicitacoes-Pet',
    meta: {
      middleware: auth
    },
    children: [
      {
        path: '/',
        name: 'Enviadas',
        view: 'solicitacoesPet.Enviadas',
        meta: {
          middleware: auth
        }
      },
      // {
      //   path: 'recebidas',
      //   name: 'Recebidas',
      //   view: 'solicitacoesPet.Recebidas',
      //   meta: {
      //     middleware: auth
      //   }
      // }
    ]
  },
]
