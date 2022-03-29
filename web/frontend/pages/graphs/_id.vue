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
    <v-expansion-panels popout class="px-10 mt-2">
      <query-editor
        v-for="query in queries"
        :key="query.id"
        :query="query"
        :graphId="graph.i"
        :emitters="emitters"
        @deleted-query="deleteQuery"
      />
    </v-expansion-panels>
    <v-btn class="pa-1 pr-3 mt-5" color="primary" @click="addQuery">
      <v-icon class="pr-0 ma-1">mdi-plus</v-icon>
      Query
    </v-btn>
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
    emitters: [],
  }),
  async fetch() {
    this.graph = await this.$axios.$get(`api/graphs/${this.id}`)
    this.queries = await this.$axios.$get(`api/graphs/${this.id}/queries`)
    this.emitters = await this.$axios.$get(`api/emitters`)
    console.log(this.queries)
  },
  head() {
    return {
      title: this.dashboard?.name || 'dashboard',
    }
  },
  methods: {
    deleteQuery(deletedQuery) {
      console.log('Deleting')
      this.queries.splice(
        this.queries.findIndex((query) => query.id === deletedQuery.id),
        1
      )
      console.log(this.queries)
    },
    async addQuery() {
      console.log('Creating new query')

      const query = await this.$axios.$post(
        `/api/graphs/${this.id}/queries/new`,
        {
          graphId: 1,
        }
      )

      this.queries.push({
        id: query.id,
        emitterId: query.emitterId,
        measurement: query.measurement,
        unit: query.unit,
        type: query.type,
        alias: query.alias,
        grouping: query.grouping,
      })
    },
  },
  computed: {
    pageName() {
      return `graph#${this.id}`
    },
    id() {
      return this.$route.params.id
    },
  },
}
</script>
<style scoped>
</style>