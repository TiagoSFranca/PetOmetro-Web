<template>
  <div fill-height fluid grid-list-sm>
    <v-spacer />
    <v-layout wrap>
      <v-flex
        v-for="n in items"
        :key="n.Id"
        lg4
        md6
        xs12
        sm12
        v-if="successSearch && items.length > 0"
      >
        <material-pet-card :pet="n" />
      </v-flex>
      <v-flex lg12 md12 xs12 sm12 v-if="successSearch">
        <v-alert prominent type="info" class="mb-4">Você ainda não possui pets</v-alert>
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
      items: [],
      source: "",
      showProgress: false,
      successSearch: false
    };
  },
  created() {
    this.showProgress = true;
    this.source = axiosSourceToken.ObterToken();
    PetsService.MeusPets(this.source).then(res => {
      if (res.pagina) {
        this.items = res.totalItens;
        this.successSearch = true;
      } else {
        this.successSearch = false;
      }
      this.showProgress = false;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  }
};
</script>