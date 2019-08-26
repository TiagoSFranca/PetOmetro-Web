<template>
  <v-navigation-drawer
    floating
    permanent
    app
    overflow
    src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
  >
    <v-list-item dark>
      <v-list-item-content>
        <v-list-item-title class="title">
          PetÔmetro
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="item in links" :key="item.text" :to="item.to" color="white" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          block
          v-if="isAuth"
          large
          outlined
          dark
          text
          color="amber darken-1"
          @click="logout()"
        >Sair</v-btn>
        <div v-else>
          <v-btn color="teal lighten-1" block text dark to="/login">Entrar</v-btn>
          <v-btn color="teal lighten-1" block text dark to="/register">Cadastre-se</v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      links: [
        {
          to: "/dashboard",
          icon: "mdi-view-dashboard",
          text: "Dashboard"
        },
        {
          to: "/pets",
          icon: "mdi-paw",
          text: "Pets"
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["isAuth"])
  },
  methods: {
    ...mapMutations("auth", ["setShowLogout"]),
    logout() {
      this.setShowLogout(true);
    }
  }
};
</script>
