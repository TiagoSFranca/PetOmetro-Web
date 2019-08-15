<template>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      dark
      app
      fixed
      class="primary">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click="showMenu"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">
          PetÔmetro
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="!logged">
        <v-btn flat>Registrar</v-btn>
        <v-divider vertical></v-divider>
        <v-btn flat to="/Login">Entrar</v-btn>
      </template>
      <template v-else>
        <v-btn flat @click="showModal">Sair</v-btn>
      </template>
      <logout-modal/>
    </v-toolbar>
</template>

<script>
import LogoutModal from '@/components/General/LogoutModal'
import { mapGetters, mapActions } from 'vuex'
import StoreGeneralConstants from '@/store/constants/general'
import StoreAuthConstants from '@/store/constants/auth'
export default {
  props: {
    source: String
  },
  components: {
    LogoutModal
  },
  computed: {
    ...mapGetters({
      drawer: StoreGeneralConstants.GETTERS.SHOW_DRAWER,
      logged: StoreAuthConstants.GETTERS.IS_AUTH
    })
  },
  methods: {
    ...mapActions({
      changeShowDrawer: StoreGeneralConstants.ACTIONS.CHANGE_SHOW_DRAWER,
      showLogoutModal: StoreAuthConstants.ACTIONS.SHOW_LOGOUT_MODAL
    }),
    showMenu () {
      this.changeShowDrawer(!this.drawer)
    },
    showModal () {
      this.showLogoutModal(true)
    }
  }
}
</script>
