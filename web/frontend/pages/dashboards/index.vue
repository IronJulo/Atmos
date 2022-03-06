<template>
  <v-container>
    <navbar-side />
    <h1>Please select a dashboard</h1>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dashboards: [],
  }),
  async fetch() {
    this.dashboards = await this.$axios.$get(`api/dashboards/`)
  },
  head() {
    return {
      title: 'Dashboard',
    }
  },
}
</script>