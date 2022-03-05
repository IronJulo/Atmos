<template>
  <div>
    <h1>Index of Atmos</h1>
    <h1>{{ $auth.user }}</h1>
    <v-btn to = "/logout" > n</v-btn>
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
  head() {
    return {
      title: 'Index',
    }
  },
}
</script>
