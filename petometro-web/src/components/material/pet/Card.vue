<template>
  <v-card elevation="3" class="mx-auto" dark color="blue lighten-1">
    <v-list-item>
      <v-list-item-avatar color="blue lighten-5">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-icon v-if="pet.idGeneroPet == 1" color="orange" v-on="on">mdi-gender-male</v-icon>
            <v-icon v-else-if="pet.idGeneroPet == 2" color="green" v-on="on">mdi-gender-female</v-icon>
            <v-icon v-else color="indigo" v-on="on">mdi-gender-male-female</v-icon>
          </template>
          <span>{{pet.generoPet.nome}}</span>
        </v-tooltip>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{pet.nome}}</v-list-item-title>
        <v-list-item-subtitle>de {{pet.usuario.nome}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img :src="pet.urlImagem !== null ? pet.urlImagem : ''" height="200px" />
    <v-card-actions>
      <v-btn text>Share</v-btn>

      <v-btn text color="purple">Explore</v-btn>

      <v-spacer />

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          <v-row>Espécie: {{pet.especie}}</v-row>
          <v-row>Raça: {{pet.raca}}</v-row>
          <v-row>Nascimento: {{new Date(pet.dtNascimento).toISOString().substr(0, 10)}}</v-row>
          <v-row>
            <v-col cols="12">{{pet.comentario}}</v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ["pet"],
  data: () => ({
    show: false
  }),
  mounted() {
    console.log(this.pet);
  }
};
</script>