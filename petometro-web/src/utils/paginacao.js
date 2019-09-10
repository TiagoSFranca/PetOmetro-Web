import { paginacao } from '@/utils/constants/'

export default {
    montarPaginacaoFiltro(filtro) {
        let query = ''
        if (filtro) {
            if (filtro.itensPorPagina)
                query += "&itensPorPagina=" + filtro.itensPorPagina
            else
                query += "&itensPorPagina=" + paginacao.MINIMO
            if (filtro.pagina)
                query += "&pagina=" + filtro.pagina
            else
                query += "&pagina=" + 1
        }
        else {
            query += "&itensPorPagina=" + paginacao.MINIMO
            query += "&pagina=" + 1
        }
        return query
    }
}