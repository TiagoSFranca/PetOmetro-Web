<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="290">
      <v-card>
        <v-card-title>
          <span class="headline">Enviar Solicitação</span>
        </v-card-title>
        <v-card-text>Tem certeza que deseja enviar a solicitação?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" text @click="hide()">Cancelar</v-btn>
          <v-btn color="primary" text submit @click="Salvar()">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import SolicitacoesPetService from "@/services/solicitacoesPet";

export default {
  props: ["showAdicionar", "idPet", "idUsuario"],
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
      SolicitacoesPetService.Adicionar(this.idUsuario, this.idPet).then(res => {
        if (res) this.hide();
      });
    }
  },
  watch: {
    showAdicionar() {
      if (this.showAdicionar && !this.visible) this.show();
      else if (!this.showAdicionar && this.visible) this.hide();
    }
  }
};
</script>