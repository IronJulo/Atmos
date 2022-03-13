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
    class="pa-0 ma-0"
      width="100%"
      :height="height"
      :options="chartOptions"
      :series="series"
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
