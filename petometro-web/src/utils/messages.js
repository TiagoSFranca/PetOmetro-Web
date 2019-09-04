export default {
    autenticacaoNecessaria: 'Autenticação necessária',
    erroConexao: 'Não foi possível estabelecer conexão com o servidor. Por favor, tente novamente mais tarde',
    emailSenhaIncorretos: 'E-mail ou Senha incorretos',
    erroDesconhecido: 'Ocorreu um erro desconhecido',
    montarErroNao401(error) {
        console.log('NÃO 401', error.response.data)
        let errorMessage = ''
        if (error.response.data.message) {
            errorMessage = error.response.data.message
        } else if (error.response.data.error_description) {
            let description = error.response.data.error_description
            if (description === 'invalid_username_or_password')
                errorMessage = this.emailSenhaIncorretos
        } else if (error.response.data.error) {
            let dataError = error.response.data.error
            if (dataError === 'invalid_grant')
                errorMessage = this.autenticacaoNecessaria
        } else {
            errorMessage = this.erroDesconhecido
        }

        return errorMessage
    },
    sucesso: {
        cadastro: 'Cadastro realizado com sucesso!',
        exclusao: 'Exclusão realizada com sucesso!',
        edicao: 'Edição realizada com sucesso!'
    }
}