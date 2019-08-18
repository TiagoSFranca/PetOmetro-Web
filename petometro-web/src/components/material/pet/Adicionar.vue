<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Pet</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" @click="hide()">Fechar</v-btn>
            <v-btn color="primary" submit @click="Salvar()">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["showAdicionar"],
  data() {
    return {
      visible: false,
      valid: true
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
      if (this.$refs.form.validate()) {
        this.hide();
      }
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