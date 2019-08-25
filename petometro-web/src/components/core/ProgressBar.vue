<template>
  <v-row justify="center">
    <v-dialog v-model="progressBar" persistent width="300">
      <v-card dark>
        <v-card-text>
          Por favor, aguarde...
          <v-progress-linear indeterminate absolute color="success" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("app", ["progressBar"])
  }
};
</script>
