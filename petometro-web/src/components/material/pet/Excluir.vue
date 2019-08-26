<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="290">
      <v-card>
        <v-card-title>
          <span class="headline">Excluir Pet</span>
        </v-card-title>
        <v-card-text>Tem certeza que deseja excluir o Pet?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" text @click="hide()">Cancelar</v-btn>
          <v-btn color="warning" text submit @click="Salvar()">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PetsService from "@/services/pets";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";

export default {
  props: ["showExcluir", "idPet"],
  data() {
    return {
      imagem: null,
      visible: false,
      valid: true,
      menu: false
    };
  },
  methods: {
    hide() {
      this.$emit("fechar");
      this.visible = false;
    },
    show() {
      this.visible = true;
    },
    Salvar() {
      PetsService.Excluir(this.idPet).then(res => {
        if (res) this.hide();
      });
    }
  },
  watch: {
    showExcluir() {
      if (this.showExcluir && !this.visible) this.show();
      else if (!this.showExcluir && this.visible) this.hide();
    }
  }
};
</script>