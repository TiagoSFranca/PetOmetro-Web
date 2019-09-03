<template v-if="showLogout">
  <v-layout row justify-center class="no-display">
    <v-dialog v-model="showLogout" max-width="320">
      <v-card>
        <v-card-title>
          <span class="headline">Sair</span>
        </v-card-title>
        <v-card-text>Tem certeza que deseja sair?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text outlined @click="closeModal">Cancelar</v-btn>
          <v-btn color="primary" text outlined @click="logout">Sair</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import authService from "@/services/auth";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["showLogout"])
  },
  methods: {
    ...mapMutations("auth", ["setShowLogout"]),
    logout() {
      this.setShowLogout(false);
      authService.logout();
    },
    closeModal() {
      this.setShowLogout(false);
    }
  }
};
</script>