export default {
    required(input) {
        return v => !!v || input + " é obrigatório"
    },
    maxLength(max) {
        return v => (v ? v : '').length <= max || `Máximo ${max} caracteres`
    }
}