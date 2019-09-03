export default {
    required(input) {
        return v => !!v || input + " é obrigatório"
    },
    maxLength(max) {
        return v => (v ? v : '').trim().length <= max || `Máximo ${max} caracteres`
    },
    minLength(min) {
        return v => (v ? v : '').trim().length >= min || `Mínimo ${min} caracteres`
    }
}