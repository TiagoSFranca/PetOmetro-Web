<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12" light>
          <v-toolbar dark flat color="blue lighten-1">
            <v-toolbar-title class="white--text">Entrar</v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
            <v-card-title
              class="fill-height overline blue-grey--text"
            >Insira seus dados para autenticar.</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="login"
                :rules="loginRules"
                prepend-icon="mdi-account"
                name="login"
                required
                label="E-mail"
                type="text"
              />
              <v-text-field
                id="password"
                v-model="password"
                :rules="passwordRules"
                prepend-icon="mdi-account-key"
                required
                name="password"
                label="Senha"
                :type="showSenha ? 'text' : 'password'"
                :append-icon="showSenha ? 'visibility' : 'visibility_off'"
                @click:append="showSenha = !showSenha"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn :disabled="!valid" color="primary" type="submit">Entrar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import authService from "@/services/auth";
import rules from "@/utils/rules";

export default {
  data: () => ({
    showSenha: false,
    valid: true,
    login: "",
    loginRules: [rules.required("E-mail")],
    password: "",
    passwordRules: [rules.required("Senha")]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        authService.auth(this.login, this.password);
      }
    }
  }
};
</script>
