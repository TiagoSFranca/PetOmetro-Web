<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12" light>
          <v-toolbar dark flat color="primary">
            <v-toolbar-title>Cadastre-se</v-toolbar-title>
          </v-toolbar>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    id="nome"
                    v-model.trim="nome"
                    :rules="nomeRules"
                    required
                    name="nome"
                    label="Nome"
                    type="text"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    id="email"
                    v-model.trim="email"
                    :rules="emailRules"
                    required
                    name="email"
                    label="E-mail"
                    type="text"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    id="login"
                    v-model.trim="login"
                    :rules="loginRules"
                    required
                    name="login"
                    label="Nome de Usuário"
                    type="text"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    id="password"
                    v-model.trim="password"
                    :rules="passwordRules"
                    required
                    name="password"
                    label="Senha"
                    :type="showSenha ? 'text' : 'password'"
                    :append-icon="showSenha ? 'visibility' : 'visibility_off'"
                    @click:append="showSenha = !showSenha"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    id="confirm_password"
                    v-model="confirm_password"
                    :rules="confirm_passwordRules"
                    required
                    name="confirm_password"
                    label="Confirmar Senha"
                    :type="showConfirmacao ? 'text' : 'password'"
                    :append-icon="showConfirmacao ? 'visibility' : 'visibility_off'"
                    @click:append="showConfirmacao = !showConfirmacao"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn :disabled="!valid" color="primary" type="submit">Cadastrar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AccountService from "@/services/account";
import rules from "@/utils/rules";
export default {
  data: () => ({
    showSenha: false,
    showConfirmacao: false,
    valid: true,
    password: "",
    confirm_password: "",
    nome: "",
    email: "",
    login: "",
    passwordRules: [rules.required("Senha"), rules.minLength(8)],
    confirm_passwordRules: [rules.required("Confirmar Senha")],
    nomeRules: [rules.required("Nome"), rules.minLength(3)],
    emailRules: [
      rules.required("E-mail"),
      v => /.+@.+\..+/.test(v) || "Insira um e-mail válido"
    ],
    loginRules: [rules.required("Nome de Usuário")]
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        AccountService.Register(
          this.nome,
          this.email,
          this.password,
          this.login
        );
      }
    }
  },
  mounted() {
    this.confirm_passwordRules.push(
      v => (!!v && v) === this.password || "Confirmação de senha diferente"
    );
  }
};
</script>
