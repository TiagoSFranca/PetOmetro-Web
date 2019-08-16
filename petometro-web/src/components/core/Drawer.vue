<template>
    <v-navigation-drawer
      clipped
      floating
      permanent
      app
      overflow
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list>
        <v-list-item
          v-for="item in links"
          :key="item.text"
          :to="item.to"
          color="white"
          link>
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
          <v-btn block v-if="isAuth" dark>Sair</v-btn>
          <v-btn block v-else dark>Entrar</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
</template>
<script>
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {
      links: [
      {
          to: '/dashboard',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
      },
      {
          to: '/pets',
          icon: 'mdi-paw',
          text: 'Pets'
      }],
    }
  },
  computed: {
    ...mapState('auth', ['isAuth'])
  },
  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    }
  }
}
</script>`
`