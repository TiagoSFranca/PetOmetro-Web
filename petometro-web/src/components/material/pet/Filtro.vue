<template>
  <v-bottom-sheet v-model="showFiltro" hide-overlay>
    <v-sheet class="text-center">
      <v-row>
        <v-col>
          <div class="title">Filtrar Pets</div>
        </v-col>
      </v-row>
      <v-form ref="form" lazy-validation @submit.prevent="submit">
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="filtro.nome" label="Nome"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="filtro.especie" label="Espécie"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="filtro.raca" label="Raça"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-autocomplete
                :items="generos"
                item-text="nome"
                item-value="id"
                label="Gênero"
                v-model="filtro.idsGeneroPet"
                multiple
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-row>
        <v-col>
          <v-btn class="mx-6" color="error" @click="fecharFiltro()">Fechar</v-btn>
          <v-btn class="mx-6" color="accent" @click="limparFiltro()">Limpar</v-btn>
          <v-btn class="mx-6" color="success" @click="filtrar()">Filtrar</v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import generoPetService from "@/services/generoPet";
import { mapState, mapMutations } from "vuex";
import axiosSourceToken from "@/utils/axiosSourceToken";

export default {
  data() {
    return {
      page: 1,
      filtro: {
        nome: "",
        especie: "",
        raca: "",
        idsGeneroPet: []
      },
      source: ""
    };
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
    generoPetService.get(this.source);
  },
  computed: {
    ...mapState("generoPet", ["generos"]),
    ...mapState("pet", ["showFiltro"])
  },
  methods: {
    ...mapMutations("pet", ["setShowFiltro"]),
    fecharFiltro() {
      this.setShowFiltro(false);
    },
    limparFiltro() {
      this.$refs.form.reset();
    },
    filtrar() {
      this.$emit("filtrar", this.filtro);
    }
  }
};
</script>