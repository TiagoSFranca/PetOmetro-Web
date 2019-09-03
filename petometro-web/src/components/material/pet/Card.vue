<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 12 : 3" class="mx-auto" dark color="blue lighten-1">
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
        <v-list-item-avatar color="blue lighten-5">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon :color="solicitacaoInfo.color" v-on="on">{{solicitacaoInfo.icon}}</v-icon>
            </template>
            <span>{{solicitacaoInfo.text}}</span>
          </v-tooltip>
        </v-list-item-avatar>
      </v-list-item>
      <v-img
        :src="pet.urlImagem !== null ? pet.urlImagem : '/images/img_nf.png'"
        height="200px"
        contain
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-card-actions>
        <v-btn icon v-if="userInfo.id === pet.idUsuario">
          <v-icon color="red accent-4" @click="showExcluir()">mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-btn icon v-if="userInfo.id === pet.idUsuario">
          <v-icon color="indigo darken-4" @click="showEditar()">mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon color="indigo darken-4">mdi-eye-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="userInfo.id !== pet.idUsuario && solicitacao.icon"
          @click="abrirModal(solicitacao.idModal)"
        >
          <v-icon :color="solicitacao.color">{{solicitacao.icon}}</v-icon>
        </v-btn>

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
            <v-row>Nascimento: {{pet.dtNascimento}}</v-row>
            <v-row>
              <v-col cols="12">{{pet.comentario}}</v-col>
            </v-row>
          </v-card-text>
        </div>
      </v-expand-transition>
      <material-solicitacao-pet-adicionar
        :showAdicionar="showAdicionar"
        :idPet="pet.id"
        :idUsuario="pet.idUsuario"
        @fechar="showAdicionar = false"
      />
    </v-card>
  </v-hover>
</template>

<script>
import { mapState } from "vuex";
import solicitacoesPetService from "@/services/solicitacoesPet";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { situacaoSolicitacao } from "@/utils/enums";
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: ["pet"],
  data: () => ({
    show: false,
    source: "",
    solicitacao: {},
    solicitacaoInfo: {},
    showAdicionar: false,
  }),
  computed: {
    ...mapState("auth", ["userInfo"])
  },
  created() {
    this.verificarSolicitacoes();
  },
  methods: {
    showExcluir (event) {
      let id = this.pet.id
      this.$emit('showModalExcluir', id)
    },
    showEditar (event) {
      let pet = cloneDeep(this.pet)
      this.$emit('showModalEditar', pet)
    },

    abrirModal(idModal) {
      //Adicionar
      if (idModal == 1) this.showAdicionar = true;
    },
    montarSolicitacaoInfo(solicitacoes) {
      let aceitas = solicitacoes.filter(
        e => e.idSituacaoSolicitacao === situacaoSolicitacao.Aceita
      );

      if (aceitas.length > 0) {
        this.solicitacao = {
          color: "indigo darken-4",
          icon: "mdi-heart-broken"
        };

        this.solicitacaoInfo = {
          color: "red darken-5",
          icon: "mdi-heart-multiple",
          text: "Pet Associado"
        };
      } else {
        let pendentes = solicitacoes.filter(
          e => e.idSituacaoSolicitacao === situacaoSolicitacao.Pendente
        );

        if (pendentes.length > 0) {
          this.solicitacaoInfo = {
            color: "green darken-5",
            icon: "mdi-heart-half",
            text: "Solicitação Pendente"
          };
        } else {
          this.solicitacao = {
            color: "indigo darken-4",
            icon: "mdi-heart-multiple-outline",
            idModal: 1
          };

          this.solicitacaoInfo = {
            color: "red darken-5",
            icon: "mdi-heart-pulse",
            text: "Pet não associado"
          };
        }
      }
    },
    verificarSolicitacoes() {
      if (this.pet.idUsuario !== this.userInfo.id) {
        this.source = axiosSourceToken.obterToken();
        solicitacoesPetService.getBySolicitante(this.source, this.pet.id).then(
          res => {
            if (res.pagina) {
              this.montarSolicitacaoInfo(res.itens);
            }
          }
        );
      } else {
        this.solicitacaoInfo = {
          color: "red darken-5",
          icon: "mdi-heart",
          text: "Meu Pet"
        };
      }
    }
  }
};
</script>