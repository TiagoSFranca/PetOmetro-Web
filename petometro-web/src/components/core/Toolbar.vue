<template>
  <v-app-bar dark app flat dense v-if="isAuth" hide-on-scroll color="blue lighten-1">
    <div class="flex-grow-1"></div>
    <template>
      <v-btn icon>
        <v-badge overlap>
          <template v-slot:badge>0</template>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("auth", ["isAuth"])
  },
  methods: {}
};
</script>