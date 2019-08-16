<template>
  <v-dialog
    v-model="progressBar"
    persistent
    width="300">
    <v-card
      color="tertiary"
      dark>
      <v-card-text>
        <v-progress-linear
          indeterminate
          color="success"
          class="mb-1" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  computed: {
    ...mapState('app', ['progressBar'])
  }
}
</script>
