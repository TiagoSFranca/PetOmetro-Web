<template>
  <v-snackbar
    v-model="toastr.show"
    :color="toastr.color"
    :timeout="toastr.timeout"
    bottom
    right>
    {{ toastr.text }}
    <v-btn
      color="primary"
      text
      @click="onClickBtn()">
      Fechar
    </v-btn>
  </v-snackbar>
</template>
<script>
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  computed: {
    ...mapState('app', ['toastr'])
  },
  methods: {
    ...mapMutations('app', ['setToastr']),
    onClickBtn () {
      this.setToastr({ show: false })
    }
  }
}
</script>
