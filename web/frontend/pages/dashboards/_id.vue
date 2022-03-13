<template>
  <div class="pa-4">
    <navbar-top :label="pageName" :editor-mode.sync="editorMode"/>
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
      >
        <graph-card :graph="graph" :editorMode="editorMode" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
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
    pageName(){
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