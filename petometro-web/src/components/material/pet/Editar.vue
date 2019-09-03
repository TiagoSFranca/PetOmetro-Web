<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Pet</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    required
                    v-model="pet.nome"
                    :rules="nomeRules"
                    counter="64"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Espécie"
                    v-model="pet.especie"
                    :rules="especieRacaRules"
                    counter="64"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="Raça"
                    required
                    v-model="pet.raca"
                    :rules="especieRacaRules"
                    counter="64"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="pet.dtNascimento"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="pet.dtNascimento"
                        label="Nascimento"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="pet.dtNascimento" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancelar</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(pet.dtNascimento)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-autocomplete
                    :items="generos"
                    item-text="nome"
                    item-value="id"
                    label="Gênero"
                    v-model="pet.idGeneroPet"
                    :rules="generoRules"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon="mdi-camera"
                    label="Imagem"
                    v-model="imagem"
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Comentário"
                    v-model="pet.comentario"
                    :rules="especieRacaRules"
                    counter="512"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" @click="hide()">Fechar</v-btn>
          <v-btn color="primary" submit @click="salvar()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import generoPetService from "@/services/generoPet";
import petService from "@/services/pets";
import axiosSourceToken from "@/utils/axiosSourceToken";
import rules from "@/utils/rules";
import { mapState } from "vuex";

export default {
  props: ["showEditar", "pet"],
  data() {
    return {
      imagem: null,
      visible: false,
      valid: true,
      menu: false,
      source: "",
      nomeRules: [rules.required("Nome"), rules.maxLength(64)],
      especieRacaRules: [rules.maxLength(64)],
      comentarioRules: [rules.maxLength(512)],
      generoRules: [rules.required("Gênero")]
    };
  },
  methods: {
    hide() {
      this.$refs.form.reset();
      this.$emit("fechar");
      this.visible = false;
    },
    show() {
      this.visible = true;
    },
    salvar() {
      if (this.$refs.form.validate()) {
        // this.pet.imagem = this.imagem
        // petService.Editar(this.pet)
        // .then(res => {
        //   if (res) {
            this.hide();
        //   }
        // });
      }
    }
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
    generoPetService.get(this.source);
  },
  computed: {
    ...mapState("generoPet", ["generos"])
  },
  watch: {
    showEditar() {
      if (this.showEditar && !this.visible) this.show();
      else if (!this.showEditar && this.visible) this.hide();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  }
};
</script>