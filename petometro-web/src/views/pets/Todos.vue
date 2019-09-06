<template>
  <div fill-height fluid grid-list-sm>
    <v-spacer />
    <v-layout wrap v-if="successSearch && pets.itens.length > 0">
      <v-flex v-for="n in pets.itens" :key="n.Id" lg4 md6 xs12 sm12>
        <material-pet-card
          :pet="n"
          @showModalExcluir="onShowModalExcluir"
          @showModalEditar="onShowModalEditar"
          @showModalAdicionarSolicitacao="onShowModalAdicionarSolicitacao"
        />
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex lg12 md12 xs12 sm12 v-if="successSearch && pets.itens.length === 0 && !showProgress">
        <v-alert prominent type="info" class="mb-4">Nenhum Pet encontrado</v-alert>
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
    <material-pet-filtro @filtrar="onFiltrar" />
    <material-solicitacao-pet-adicionar
      :showAdicionarSolicitacao="showAdicionarSolicitacao"
      :idPet="pet.id"
      :idUsuario="pet.idUsuario"
      @fechar="showAdicionarSolicitacao = false"
    />
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
      showAdicionarSolicitacao: false,
      idPetSelecionado: 0,
      pet: {},
      filtro: {}
    };
  },
  methods: {
    consultarPets() {
      this.showProgress = true;
      this.source = axiosSourceToken.obterToken();
      petsService.get("", this.source, this.filtro).then(res => {
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
    },
    onFiltrar(filtro) {
      this.filtro = filtro;
      this.consultarPets();
    },
    onShowModalAdicionarSolicitacao(pet) {
      this.pet = pet;
      this.showAdicionarSolicitacao = true;
    }
  },
  created() {
    this.consultarPets();
  },
  computed: {
    ...mapState("pet", ["pets", "consultar"])
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  watch: {
    consultar() {
      this.consultarPets();
    }
  }
};
</script>