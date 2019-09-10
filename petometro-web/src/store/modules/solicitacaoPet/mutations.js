import { set, toggle } from '@/utils/vuex'

export default {
  setSolicitacoes: set('solicitacoes'),
  setConsultar: set('consultar'),
  setShowFiltro: set('showFiltro'),
  toggleShowFiltro: toggle('showFiltro')
}
