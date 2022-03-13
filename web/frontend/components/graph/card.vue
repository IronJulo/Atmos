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
    this.rawData = await this.$axios.$get(`/api/graphs/${this.graph.id}/data`)
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
        stroke: {
          curve: 'smooth',
          width: 5,
        },
        xaxis: {
          type: 'datetime',
        },
        chart: {
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

        // yaxis: this.rawData.yaxis,
      }
    },
    height() {
      return Math.max(100, this.graph.height * 100)
    },
    series() {
      return this.rawData.series
    },
    chartStyles() {
      return {
        'max-height': `${this.height}px !important`,
      }
    },
  },
}
</script>
