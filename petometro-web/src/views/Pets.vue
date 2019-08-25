<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-toolbar xs12 md12 sm12 lg12 color="blue lighten-1" class="elevation-2" extended>
          <v-toolbar-title class="white--text">Pets</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn fab dark text @click="showAdicionar = true">
            <v-icon>add</v-icon>
          </v-btn>
          <template v-slot:extension>
            <v-tabs
              background-color="blue lighten-1"
              color="deep-purple lighten-5"
              icons-and-text
              fixed-tabs
              extended
            >
              <v-tabs-slider />
              <v-tab v-for="tab in tabs" :key="tab.key" :to="tab.to">
                {{ tab.text }}
                <v-icon :color="tab.color">{{ tab.icon }}</v-icon>
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <router-view />
        <material-pet-adicionar :showAdicionar="showAdicionar" @fechar="showAdicionar = false" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          to: "/pets/",
          text: "Todos",
          key: "todos",
          icon: "mdi-heart-pulse",
          color: "red darken-5"
        },
        {
          to: "/pets/meus-pets",
          text: "Meus Pets",
          key: "meus-pets",
          icon: "mdi-heart",
          color: "red darken-5"
        },
        {
          to: "/pets/associados",
          text: "Pets Associados",
          key: "pets-associados",
          icon: "mdi-heart-multiple",
          color: "red darken-5"
        },
        {
          to: "/pets/solicitacoes-enviadas",
          text: "Solicitações Enviadas",
          key: "solicitacoes-enviadas",
          icon: "mdi-heart-half",
          color: "green darken-5"
        },
        {
          to: "/pets/solicitacoes-recebidas",
          text: "Solicitações Recebidas",
          key: "solicitacoes-recebidas",
          icon: "mdi-heart-half-full",
          color: "green darken-5"
        }
      ],
      showAdicionar: false
    };
  },
  methods: {
  }
};
</script>
