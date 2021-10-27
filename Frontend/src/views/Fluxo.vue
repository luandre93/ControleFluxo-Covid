<template>
  <v-container style="height: 80vh">
    <v-col style="height: 12%; margin-top: 80px">
      <v-col class="my-auto">
        <h1>Loja {{ nome }}</h1></v-col
      >
    </v-col>
    <v-col style="height: 15%" class="my-auto">
      <v-progress-linear
        class="rounded-pill mt-5"
        height="20"
        v-model="progress"
        color="orange"
      ></v-progress-linear>
    </v-col>

    <v-col style="height: 40%">
      <div class="circulo">
        <v-col>
          <span class="text-align"> {{ cliente.Message }}</span></v-col
        >
      </div>
    </v-col>
    <v-col>
      <v-row>
        <v-col>
          <v-btn
            fab
            x-large
            depressed
            @click="controle('diminuir')"
            style="background-color: green; color: white"
            ><v-icon>mdi-minus-thick</v-icon>
          </v-btn></v-col
        >
        <v-col>
          <div class="">
            <v-btn
              fab
              x-large
              depressed
              @click="alterarLimite()"
              style="background-color: orange; color: white"
              >Limite
            </v-btn>
          </div>
        </v-col>
        <v-col>
          <v-btn
            depressed
            x-large
            fab
            @click="controle('aumentar')"
            style="background-color: red; color: white"
            ><v-icon>mdi-plus-thick</v-icon></v-btn
          >
        </v-col>
      </v-row></v-col
    >
  </v-container>
</template>

<script>
import io from "socket.io-client";
var socket = io.connect("http://192.168.0.5:8081", {
  transports: ["websocket"],
});
export default {
  data() {
    return {
      cliente: { Message: 0, Limite: 0 },
      progress: 0,
      nome: "",
    };
  },
  mounted() {
    this.verificar();
    this.existName();
    const self = this;
    socket.emit("join", this.nome);
    socket.on("chat", function (data) {
      self.cliente = JSON.parse(data);
      self.progress = (self.cliente.Message / self.cliente.Limite) * 100;
    });
  },

  methods: {
    verificar() {
      if (!localStorage.getItem("loja")) {
        this.$router.push("/Home");
      }
    },
    existName() {
      if (localStorage) {
        this.nome = localStorage.getItem("loja");
      }
    },

    alterarLimite() {
      var x = prompt("Alterar limite:", parseInt(this.cliente.Limite));
      this.cliente.Limite = parseInt(x);
      socket.emit("send", JSON.stringify(this.cliente));
    },

    controle(x) {
      if (x == "aumentar") {
        if (this.cliente.Message < this.cliente.Limite) {
          this.cliente.Message += 1;
          this.progress = (this.cliente.Message / this.cliente.Limite) * 100;
          socket.emit("send", JSON.stringify(this.cliente));
        }
      }
      if (x == "diminuir") {
        if (this.cliente.Message > 0) {
          this.cliente.Message -= 1;
          this.progress = (this.cliente.Message / this.cliente.Limite) * 100;
          socket.emit("send", JSON.stringify(this.cliente));
        }
      }
    },
  },
};
</script>



<style>
.fontSize {
  font-size: 40px;
}

.circulo {
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 25px 2px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0px 0px 25px 2px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 0px 25px 2px rgba(0, 0, 0, 0.13);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
}

.text-align {
  line-height: 170px;
  font-weight: 500;
  font-size: 52px;
  color: #000;
  text-align: center;
}
</style>
