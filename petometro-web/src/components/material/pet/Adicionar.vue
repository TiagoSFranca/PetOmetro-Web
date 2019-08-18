<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Pet</span>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Nome" required></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Espécie"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Raça" required></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="Nascimento"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Gênerio"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Comentário"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
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
      valid: true,
      date: new Date().toISOString().substr(0, 10),
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