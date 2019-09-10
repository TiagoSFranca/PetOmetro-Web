<template>
  <div fill-height fluid grid-list-sm>
    <v-spacer />
    <v-layout wrap v-if="successSearch && solicitacoes.totalItens > 0">
      <v-flex v-for="n in solicitacoes.itens" :key="n.Id" lg4 md6 xs12 sm12>
        <material-solicitacao-pet-card :solicitacaoPet="n" @showModalExcluir="onShowModalExcluir" />
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex
        lg12
        md12
        xs12
        sm12
        v-if="successSearch && solicitacoes.totalItens === 0 && !showProgress"
      >
        <v-alert
          prominent
          type="info"
          class="mb-4"
          v-if="!filtro"
        >Você ainda não enviou nenhuma solicitação</v-alert>
        <v-alert
          prominent
          type="info"
          class="mb-4"
          v-else
        >Solicitações não encontradas para o filtro especificado</v-alert>
      </v-flex>
      <v-flex lg12 md12 xs12 sm12 v-if="showProgress">
        <core-progress-circular :show="showProgress" />
      </v-flex>
    </v-layout>
    <material-solicitacao-pet-excluir
      :showExcluir="showExcluir"
      :idSolicitacao="idSolicitacaoSelecionada"
      @fechar="showExcluir = false"
    />
  </div>
</template>

<script>
import solicitacoesPetService from "@/services/solicitacoesPet";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";

export default {
  data() {
    return {
      source: "",
      showProgress: false,
      successSearch: false,
      showExcluir: false,
      idSolicitacaoSelecionada: 0,
      filtro: {}
    };
  },
  methods: {
    consultarSolicitacoes() {
      this.showProgress = true;
      this.source = axiosSourceToken.obterToken();
      solicitacoesPetService
        .get("", this.source, this.filtro, this.paginacao)
        .then(res => {
          if (res) {
            this.successSearch = true;
          } else {
            this.successSearch = false;
          }
          this.showProgress = false;
        });
    },
    onShowModalExcluir(idSolicitacao) {
      this.idSolicitacaoSelecionada = idSolicitacao;
      this.showExcluir = true;
    }
  },
  created() {
    this.consultarSolicitacoes();
  },
  computed: {
    ...mapState("solicitacaoPet", ["solicitacoes", "consultar"])
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  watch: {
    consultar() {
      this.consultarSolicitacoes();
    }
  }
};
</script>