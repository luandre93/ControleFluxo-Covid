<template>
  <div id="app">
    <v-app id="view">
      <v-app-bar flat height="80" fixed dark class="bg-top">
        <v-spacer></v-spacer>
        <v-toolbar-title class="font-weight-medium"
          >Controle de Fluxo</v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-app-bar>
      <router-view style="height: 100%" class="elevation-2" />
    </v-app>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>

<style>
.bg-top {
  color: #000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media only screen and (min-width: 768px) {
  #app {
    margin-left: auto;
    margin-right: auto;
    width: 400px !important;
  }
}
</style>


