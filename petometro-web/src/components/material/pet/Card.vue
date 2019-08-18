<template>
  <v-card
    elevation="3"
    class="mx-auto">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{pet.Nome}}</v-list-item-title>
        <v-list-item-subtitle>de {{pet.Usuario.Nome}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="pet.UrlImagem"
      height="200px"
    />
    <v-card-actions>
      <v-btn text>Share</v-btn>

      <v-btn
        text
        color="purple"
      >
        Explore
      </v-btn>

      <v-spacer/>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ['pet'],
  data: () => ({
    show: false
  })
}
</script>