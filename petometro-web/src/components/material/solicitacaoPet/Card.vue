<template>
  <v-hover v-slot:default="{ hover }">
    <v-card class="mx-auto" outlined :elevation="hover ? 12 : 3" dark color="blue lighten-1">
      <v-list-item v-if="solicitacaoPet.idUsuarioSolicitante !==userInfo.id">
        <v-list-item-content>
          <v-list-item-subtitle>Enviado por {{solicitacaoPet.usuarioSolicitante.nome}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-avatar color="blue lighten-5">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon
                v-if="solicitacaoPet.pet.idGeneroPet == 1"
                color="orange"
                v-on="on"
              >mdi-gender-male</v-icon>
              <v-icon
                v-else-if="solicitacaoPet.pet.idGeneroPet == 2"
                color="green"
                v-on="on"
              >mdi-gender-female</v-icon>
              <v-icon v-else color="indigo" v-on="on">mdi-gender-male-female</v-icon>
            </template>
            <span>{{solicitacaoPet.pet.generoPet.nome}}</span>
          </v-tooltip>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{solicitacaoPet.pet.nome}}</v-list-item-title>
          <v-list-item-subtitle
            v-if="solicitacaoPet.idUsuarioSolicitante !==userInfo.id"
          >de {{solicitacaoPet.usuarioSolicitado.nome}}</v-list-item-subtitle>
          <v-list-item-subtitle v-else>&nbsp</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-img
        height="100px"
        contain
        :src="solicitacaoPet.pet.urlImagem !== null ? solicitacaoPet.pet.urlImagem : '/images/img_nf.png'"
      ></v-img>
      <v-card-text>
        <v-row>
          <v-col cols="12">Data de Envio: {{solicitacaoPet.dataSolicitacao | formatDate}}</v-col>
        </v-row>
      </v-card-text>
      <v-alert
        type="info"
        colored-border
        border="top"
        class="mb-0 pa-3 overline"
        light
        tile
      >Situação {{solicitacaoPet.situacaoSolicitacao.nome}}</v-alert>
      <v-card-actions>
        <v-btn icon v-if="solicitacaoPet.idUsuarioSolicitante === userInfo.id">
          <v-icon color="red accent-4" @click="showExcluir()">mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["solicitacaoPet"],
  data: () => ({}),
  computed: {
    ...mapState("auth", ["userInfo"])
  },
  created() {},
  methods: {
    showExcluir() {
      let id = this.solicitacaoPet.id;
      this.$emit("showModalExcluir", id);
    }
  }
};
</script>