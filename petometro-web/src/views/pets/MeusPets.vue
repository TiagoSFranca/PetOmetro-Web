<template>
  <div fill-height fluid grid-list-sm>
    <v-spacer />
    <v-layout wrap>
      <v-flex v-for="n in items" :key="n.Id" lg4 md6 xs12 sm12>
        <material-pet-card :pet="n" />
      </v-flex>
      <v-flex lg12 md12 xs12 sm12>
        <core-progress-circular :show="showProgress" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PetsService from "@/api-services/pets";
import axiosSourceToken from "@/utils/axiosSourceToken";
export default {
  data() {
    return {
      items: [
        // {
        //   Id: 1,
        //   Nome: "Teste",
        //   UrlImagem: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        //   Usuario: {
        //     Id: 1,
        //     Nome: "Teste",
        //     Sobrenome: "Testes"
        //   }
        // }
      ],
      source: "",
      showProgress: false
    };
  },
  created() {
    this.showProgress = true;
    this.source = axiosSourceToken.ObterToken();
    PetsService.Get(this.source).then(res => {
      this.showProgress = false;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  }
};
</script>