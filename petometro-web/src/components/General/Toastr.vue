<template>
    <v-snackbar
      v-model="showToastr.show"
      :timeout="timeout"
    >
      {{ showToastr.message }}
      <v-btn
        :color="showToastr.color"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
import StoreGeneralConstants from '@/store/constants/general'
export default {
  data: () => ({
    timeout: 2000
  }),
  computed: {
    ...mapGetters({
      showToastr: StoreGeneralConstants.GETTERS.SHOW_TOASTR
    })
  }
}
</script>
