<template>
  <v-card :class="cardClasses" :loading="$fetchState.pending" outlined>
    <v-hover>
      <template #default="{ hover }">
        <v-card-title>
          {{ graph.label }}
          <template v-if="hover">
            <v-spacer />
            <v-btn icon small class="mr-2">
              <v-icon>mdi-resize</v-icon>
            </v-btn>
            <v-btn icon small class="mr-2">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-btn icon small :loading="$fetchState.pending" @click="$fetch">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
        </v-card-title>
      </template>
    </v-hover>
    <apexchart
      :style="chartStyles"
      :height="height"
      width="100%"
      :options="chartOptions"
      :series="series"
      class="mx-2"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    graph: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    rawData: {
      data: [],
    },
  }),
  async fetch() {
    this.rawData = await this.$axios.$get(`/api/graph-data/${this.graph.id}`)
  },
  computed: {
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
        grid: {},
        chart: {
          background,
          type: this.graph.type,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          curve: 'smooth',
          width: 5,
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return value + this.graph.unit
            },
          },
        },
      }
    },
    height() {
      return Math.max(100, this.graph.height * 100)
    },
    series() {
      return [
        {
          data: this.rawData.data,
        },
      ]
    },
    chartStyles() {
      return {
        'max-height': `${this.height}px !important`,
      }
    },
  },
}
</script>
