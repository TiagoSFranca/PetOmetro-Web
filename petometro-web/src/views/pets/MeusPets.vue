<template>
  <div fill-height fluid grid-list-sm>
    <v-spacer />
    <v-layout wrap>
      <v-flex
        v-if="successSearch && pets.itens.length > 0"
        v-for="n in pets.itens"
        :key="n.Id"
        lg4
        md6
        xs12
        sm12
      >
        <material-pet-card :pet="n" />
      </v-flex>
      <v-flex lg12 md12 xs12 sm12 v-if="successSearch && pets.itens.length === 0">
        <v-alert prominent type="info" class="mb-4">Você ainda não possui pets</v-alert>
      </v-flex>
      <v-flex lg12 md12 xs12 sm12 v-if="showProgress">
        <core-progress-circular :show="showProgress" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import PetsService from "@/services/pets";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";
export default {
  data() {
    return {
      source: "",
      showProgress: false,
      successSearch: false
    };
  },
  computed: {
    ...mapState("pet", ["pets", "consultar"])
  },
  methods: {
    Consultar() {
      this.showProgress = true;
      this.source = axiosSourceToken.ObterToken();
      PetsService.MeusPets(this.source, true).then(res => {
        if (res) {
          this.successSearch = true;
        } else {
          this.successSearch = false;
        }
        this.showProgress = false;
      });
    }
  },
  created() {
    this.Consultar();
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  watch: {
    consultar() {
      this.Consultar();
    }
  }
};
</script>