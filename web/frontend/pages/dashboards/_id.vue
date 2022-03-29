<template>
  <div class="pa-4">
    <navbar-top
      :date-from.sync="dateFrom"
      :date-to.sync="dateTo"
      :hour-from.sync="hourFrom"
      :hour-to.sync="hourTo"
      :label="pageName"
      :editor-mode.sync="editorMode"
    />
    <navbar-side />
    <grid-layout
      :layout.sync="graphs"
      :col-num="12"
      :row-height="30"
      :is-draggable="editorMode"
      :is-resizable="editorMode"
      :vertical-compact="true"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
        v-for="graph in graphs"
        :minW="3"
        :minH="6"
        :maxH="30"
        :key="graph.i"
        :static="false"
        :x="graph.x"
        :y="graph.y"
        :w="graph.w"
        :h="graph.h"
        :i="graph.i"
        @resized="$refs[`chart${graph.i}`][0].reloadGraph()"
      >
        <graph-card
          :ref="`chart${graph.i}`"
          :graph="graph"
          :editorMode="editorMode"
          :timeData="{ dateFrom, dateTo, hourFrom, hourTo }"
          fetchData="fetchGraphData"
        />
      </grid-item>
    </grid-layout>
    <v-btn
      v-if="editorMode"
      class="ml-2 mb-2 mt-0"
      color="primary"
      @click="addGraph"
    >
      <v-icon class="pr-0 ma-1">mdi-plus</v-icon>
      Add graph
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
    dashboard: null,
    graphs: [],
    editorMode: false,
  }),
  async fetch() {
    this.dashboard = await this.$axios.$get(`api/dashboards/${this.id}`)
    this.graphs = await this.$axios.$get(`api/dashboards/${this.id}/graphs`)
    console.log(this.graphs)
  },
  head() {
    return {
      title: this.dashboard?.name || 'dashboard',
    }
  },
  methods: {
    async addGraph() {
      await this.$axios.$post(`api/graphs/new`, {
        dashboardId: this.$route.params.id,
      })
      this.graphs = await this.$axios.$get(`api/dashboards/${this.id}/graphs`)
    },
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
<style lang="css">
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>