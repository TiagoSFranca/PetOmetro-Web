<template>
  <v-card class="mx-auto" dark color="blue lighten-1">
    <v-row>
      <v-col cols="3" center>
        <v-subheader>Exibindo {{ inicio }}-{{ fim }} de {{ totalItens }} itens</v-subheader>
      </v-col>
      <v-col cols="6">
        <v-pagination
          v-model="paginaAtual"
          :length="totalPaginas"
          :total-visible="7"
          @input="onChangePagina"
        ></v-pagination>
      </v-col>
      <v-col cols="3">
        <v-subheader>
          <v-autocomplete
            :items="paginacaoList"
            item-text="text"
            item-value="value"
            label="Itens por página"
            v-model="paginacao.itensPorPagina"
            @change="onChangeItensPorPagina"
          ></v-autocomplete>
        </v-subheader>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { paginacaoList } from "@/utils/constants";
import cloneDeep from "lodash/cloneDeep";

export default {
  props: ["totalPaginas", "pagina", "totalItens", "itensPorPagina", "qtdItens"],
  data() {
    return {
      inicio: 0,
      fim: 0,
      paginacaoList: paginacaoList.paginacao,
      paginaAtual: 0,
      paginacao: {}
    };
  },
  created() {
    this.inicio =
      this.totalItens > 0 ? (this.pagina - 1) * this.itensPorPagina + 1 : 0;
    let final = this.itensPorPagina - this.qtdItens;
    this.fim = this.pagina * this.itensPorPagina;
    this.paginaAtual = this.pagina;

    if (this.fim > this.totalItens) this.fim -= final;

    this.paginacao.itensPorPagina = this.itensPorPagina;
    this.paginacao.pagina = this.paginaAtual;
  },
  methods: {
    onChangeItensPorPagina() {
      this.paginacao.pagina = 1;
      this.paginar();
    },
    onChangePagina() {
      this.paginacao.pagina = this.paginaAtual;
      this.paginar();
    },
    paginar() {
      let paginacao = cloneDeep(this.paginacao);
      this.$emit("paginar", paginacao);
    }
  }
};
</script>