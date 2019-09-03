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
        <material-pet-card
          :pet="n"
          @showModalExcluir="onShowModalExcluir"
          @showModalEditar="onShowModalEditar"
        />
      </v-flex>
      <v-flex lg12 md12 xs12 sm12 v-if="successSearch && pets.itens.length === 0">
        <v-alert prominent type="info" class="mb-4">Você ainda não possui pets</v-alert>
      </v-flex>
      <v-flex lg12 md12 xs12 sm12 v-if="showProgress">
        <core-progress-circular :show="showProgress" />
      </v-flex>
    </v-layout>
    <material-pet-excluir
      :showExcluir="showExcluir"
      :idPet="idPetSelecionado"
      @fechar="showExcluir = false"
    />
    <material-pet-editar :pet="pet" :showEditar="showEditar" @fechar="showEditar = false" />
  </div>
</template>

<script>
import petsService from "@/services/pets";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";

export default {
  data() {
    return {
      source: "",
      showProgress: false,
      successSearch: false,
      showExcluir: false,
      showEditar: false,
      idPetSelecionado: 0,
      pet: {}
    };
  },
  computed: {
    ...mapState("pet", ["pets", "consultar"])
  },
  methods: {
    consultarMeusPets() {
      this.showProgress = true;
      this.source = axiosSourceToken.obterToken();
      petsService.meusPets(this.source, true).then(res => {
        if (res) {
          this.successSearch = true;
        } else {
          this.successSearch = false;
        }
        this.showProgress = false;
      });
    },
    onShowModalExcluir(idPet) {
      this.idPetSelecionado = idPet;
      this.showExcluir = true;
    },
    onShowModalEditar(pet) {
      this.pet = pet;
      this.showEditar = true;
    }
  },
  created() {
    this.consultarMeusPets();
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  watch: {
    consultar() {
      this.consultarMeusPets();
    }
  }
};
</script>