<template>
  <div class="pa-4">
    <navbar-side />
    <v-row class="d-flex">
      <v-col
        v-for="graph in graphs"
        :key="graph.order"
        cols="12"
        sm="12"
        :md="graph.width"
      >
        <graph-card :graph="graph" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    dashboard: null,
    graphs: [],
  }),
  async fetch() {
    this.dashboard = await this.$axios.$get(`api/dashboards/${this.id}`)
    this.graphs = await this.$axios.$get(`api/graphs/${this.id}`)
    console.log(this.graphs);
  },
  computed: {
    id() {
      return this.$route.params.id
    },
  },
}
</script>