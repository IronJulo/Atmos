<template>
  <v-parallax src="https://wallpaperaccess.com/full/1369012.jpg">
    <v-card
      elevation="3"
      outlined
      shaped
      tile
      class="d-flex justify-space-between pa-0 ma-10 flex-grow-1"
      max-height="50px"
    >
      <div class="d-flex align-center ml-1"> 
        <v-img
        class="pl-2"
          :src="require(`~/assets/images/Atmos_logo.png`)"
          height="35px"
          width="35px"
        />
        <h2 class="pl-2">Atmos</h2>
      </div>
      <div v-if="!$auth.user" class="d-flex align-center">
        <v-btn class="pa-2 ma-2" color="primary" to="/register">
          Register
        </v-btn>
        <v-btn class="pa-2 ma-2" color="primary" to="/login"> Login </v-btn>
      </div>
      <div v-else class="d-flex align-center">
        <v-btn class="pa-2 ma-2" color="primary" to="/dashboards">
          Open dashboards
        </v-btn>
        <v-btn class="pa-2 ma-2" color="primary" to="/logout"> Logout </v-btn>
      </div>
    </v-card>
    <v-row align="top" justify="center">
      <v-col class="text-center">
        <h1>toto</h1>
      </v-col>
      <v-col class="text-center">
        <h1>toto</h1>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,
  head() {
    return {
      title: 'Index',
    }
  },
}
</script>
<style lang="css">
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
