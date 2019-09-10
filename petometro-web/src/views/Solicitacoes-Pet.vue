<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-toolbar xs12 md12 sm12 lg12 color="blue lighten-1" class="elevation-2" extended>
          <v-toolbar-title class="white--text">Soliticações Pet</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-slot:extension>
            <v-tabs
              background-color="blue lighten-1"
              color="deep-purple lighten-5"
              icons-and-text
              extended
              grow
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
          to: "/",
          text: "Solicitações Enviadas",
          key: "solicitacoes-enviadas",
          icon: "mdi-heart-half",
          color: "yellow darken-4"
        },
        {
          to: "/recebidas",
          text: "Solicitações Recebidas",
          key: "solicitacoes-recebidas",
          icon: "mdi-heart-half-full",
          color: "yellow darken-4"
        }
      ],
      showAdicionar: false
    };
  },
  methods: {
  }
};
</script>
