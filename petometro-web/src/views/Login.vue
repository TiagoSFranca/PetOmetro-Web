<template>
  <v-container
    fluid
    fill-height>
    <v-layout
      align-center
      justify-center>
      <v-flex
        xs12
        sm8
        md8>
        <v-card
          class="elevation-12"
          light>
          <v-toolbar
            dark
            color="accent">
            <v-toolbar-title>Entrar</v-toolbar-title>
          </v-toolbar>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit">
            <v-card-text>
              <v-text-field
                v-model="login"
                :rules="loginRules"
                prepend-icon="mdi-account"
                name="login"
                required
                label="Usuário ou Email"
                type="text"/>
              <v-text-field
                id="password"
                v-model="password"
                :rules="passwordRules"
                prepend-icon="mdi-account-key"
                required
                name="password"
                label="Senha"
                type="password"/>
              <v-checkbox
                v-model="keep"
                label="Manter conectado"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                :disabled="!valid"
                color="primary"
                type="submit">Entrar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthService from '@/api-services/auth'
export default {
  data: () => ({
    drawer: null,
    valid: true,
    login: '',
    keep: false,
    loginRules: [v => !!v || 'Usuário ou Email é obrigatório'],
    password: '',
    passwordRules: [v => !!v || 'Senha é obrigatório']
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        AuthService.Auth(this.login, this.password, this.keep)
      }
    }
  }
}
</script>
