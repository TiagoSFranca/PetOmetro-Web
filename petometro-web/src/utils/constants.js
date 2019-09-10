export const baseUrlAuth = "http://localhost:5000/connect"

export const baseUrlApi = "http://localhost:56986/api/"

export const clientId = "vue"

export const paginacao = {
    MINIMO: 6,
    MEDIO: 12,
    MAXIMO: 18,
}

export const paginacaoList = {
    paginacao: [
        {
            text: paginacao.MINIMO + ' Itens',
            value: paginacao.MINIMO
        },
        {
            text: paginacao.MEDIO + ' Itens',
            value: paginacao.MEDIO
        },
        {
            text: paginacao.MAXIMO + ' Itens',
            value: paginacao.MAXIMO
        }
    ]
}