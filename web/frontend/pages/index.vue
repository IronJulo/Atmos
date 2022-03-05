<template>
  <div>
    <h1>Index of Atmos</h1>
    <h1 v-if="$auth.loggedIn">{{ $auth.user.name }}</h1>
    <h1 v-if="$auth.loggedIn">{{ $auth.user.email }}</h1>
    <v-btn to="/logout"> Logout </v-btn>
    <v-btn to="/register"> Register </v-btn>
    <v-btn to="/login"> Login </v-btn>
    <v-img
      contain
      :src="require(`~/assets/images/Atmos_logo.png`)"
      :aspect-ratio="16 / 9"
      class="subheading pt-4"
      height="10vh"
    ></v-img>
  </div>
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
