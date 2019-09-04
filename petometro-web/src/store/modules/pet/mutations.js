import { set, toggle } from '@/utils/vuex'

export default {
  setPets: set('pets'),
  setConsultar: set('consultar'),
  setShowFiltro: set('showFiltro'),
  toggleShowFiltro: toggle('showFiltro')
}
