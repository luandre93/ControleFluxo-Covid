<template>
  <v-container class="px-2">
    <v-col style="height: 30vh"></v-col>
    <v-col style="height: 20vh">
      <v-icon x-large class="my-1 mb-4">mdi-alert</v-icon>

      <p>
        Favor escolha número da loja que esteja cadastrado no servidor.
      </p></v-col
    >
    <v-col style="height: 20vh"></v-col>
    <v-footer fixed color="#eee">
      <v-col class="px-0">
        <v-text-field
          v-model="loja.name"
          prepend-inner-icon="mdi-domain"
          placeholder="Número da Loja"
          single-line
          type="number"
          editable
          clearable
          min="0"
          max="999"
          outlined
          oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
          class="center-text px-0"
        ></v-text-field>

        <v-btn block text tile @click="login()"> Entrar </v-btn>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loja: {
        name: "",
      },
    };
  },
  mounted() {
    this.verificar();
  },

  methods: {
    verificar() {
      if (localStorage.getItem("loja")) {
        this.$router.push("/Fluxo");
      }
    },
    login() {
      localStorage.setItem("loja", this.loja.name);
      this.$router.push("/Fluxo");
    },
  },
  computed: {},
};
</script>



<style>
.fontSize {
  font-size: 40px;
}
.bg {
  background-color: white;
}

.center-text input {
  text-align: center !important;
  border-bottom: none !important;

  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.center-text input[placeholder] {
  text-align: center !important;
  font-family: Arial, Helvetica, sans-serif;
}

.text-align {
  line-height: 170px;
  font-weight: 500;
  font-size: 52px;
  color: #000;
  text-align: center;
}
</style>
