<template>
  <v-card
    height="100%"
    :class="cardClasses"
    :loading="$fetchState.pending"
    outlined
  >
    <v-hover>
      <template #default="{ hover }">
        <v-card-title>
          {{ graph.label }}
          <template v-if="hover && rawData.series">
            <v-spacer />
            <v-btn v-if="editorMode" icon small class="mr-2">
              <v-icon>mdi-resize</v-icon>
            </v-btn>
            <v-btn v-if="editorMode" icon small @click="deleteGraph">
              <v-icon>mdi-delete-forever-outline</v-icon>
            </v-btn>
            <v-btn icon small :loading="$fetchState.pending" @click="$fetch">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
        </v-card-title>
      </template>
    </v-hover>
    <apexchart
      v-if="rawData.series"
      :id="chartId"
      class="pr-2"
      width="100%"
      max-width="100%"
      :height="height"
      :max-height="height"
      :options="chartOptions"
      :series="series"
    />
    <div v-else>
      <v-card-title class="text-xs-center">
        <h5>Error graph data not found</h5>
      </v-card-title>
      <v-layout justify-center>
        <v-card-actions>
          <v-btn primary @click="$fetch">
            <span>Reload</span>
          </v-btn>
        </v-card-actions>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    graph: {
      type: Object,
      required: true,
    },
    editorMode: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    rawData: {
      data: [],
    },
  }),
  async fetch() {
    this.rawData = await this.$axios.$get(`/api/graphs/${this.graph.i}/data`)
  },
  methods: {
    render() {
      this.chart.render()
    },
  },
  computed: {
    chartId() {
      return `chart${this.graph.i}`
    },
    cardClasses() {
      return {
        'fill-height': this.fullHeight,
      }
    },
    chartOptions() {
      const { dark } = this.$vuetify.theme
      const mode = dark ? 'dark' : 'light'
      const background = dark ? '#1E1E1E' : '#FFF'
      return {
        theme: {
          mode,
        },
        stroke: {
          curve: 'smooth',
          width: 5,
        },
        xaxis: {
          type: 'datetime',
        },
        chart: {
          redrawOnParentResize: true,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
          stacked: false,
          background,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },
      }
    },
    height() {
      return `${65 + this.graph.h}%`
    },
    series() {
      return this.rawData.series
    },
    chartStyles() {
      return {
        'max-height': `10   % !important`,
      }
    },
  },
}
</script>
