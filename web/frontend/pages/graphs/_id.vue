<template>
  <div class="pa-4">
    <navbar-top
      :date-from.sync="dateFrom"
      :date-to.sync="dateTo"
      :hour-from.sync="hourFrom"
      :hour-to.sync="hourTo"
      :label="pageName"
      :editor-mode.sync="editorMode"
      :editable="false"
    />
    <navbar-side />
    <graph-card
      v-if="graph"
      fixed-height="400vh"
      :graph="graph"
      :editorMode="editorMode"
      :timeData="{ dateFrom, dateTo, hourFrom, hourTo }"
    />
    <v-expansion-panels
      popout
      class="px-10 mt-2"
      v-for="query in queries"
      :key="query.id"
    >
      <query-editor :query="query" :graphId="graph.i" />
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data: () => ({
    dateFrom: '',
    dateTo: '',
    hourFrom: '',
    hourTo: '',
    editorMode: false,
    graph: null,
    queries: [],
  }),
  async fetch() {
    this.graph = await this.$axios.$get(`api/graphs/${this.id}`)
    this.queries = await this.$axios.$get(`api/graphs/${this.id}/queries`)
    console.log(this.queries)
  },
  head() {
    return {
      title: this.dashboard?.name || 'dashboard',
    }
  },
  methods: {
    layoutUpdatedEvent(newLayout) {
      console.log('Updated layout: ', newLayout)

      const changes = []
      newLayout.forEach((item) => {
        changes.push({
          id: item.i,
          height: item.h,
          width: item.w,
          x: item.x,
          y: item.y,
        })
      })

      this.$axios.$put(`api/dashboards/${this.id}/graphs-layouts`, { changes })
    },
  },
  computed: {
    pageName() {
      return this.dashboard?.name || 'dashboard'
    },
    id() {
      return this.$route.params.id
    },
  },
}
</script>
<style scoped>
</style>