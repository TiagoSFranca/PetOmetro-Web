<template>
  <!-- <v-bottom-navigation dark background-color="blue lighten-1" class="elevation-0" extended> -->
  <v-card class="mx-auto" dark color="blue lighten-1">
      <v-row>
        <v-col cols="3">Exibindo x-p de y itens</v-col>
        <v-col cols="6">
          <v-pagination v-model="pagina" :length="totalPaginas" :total-visible="7"></v-pagination>
        </v-col>
        <v-col cols="3">
          <v-autocomplete item-text="value" item-value="value" label="Itens por página"></v-autocomplete>
        </v-col>
      </v-row>
  </v-card>
  <!-- </v-bottom-navigation> -->
</template>

<script>
export default {
  props: ["totalPaginas", "pagina"],
  data() {
    return {};
  }
};
</script>