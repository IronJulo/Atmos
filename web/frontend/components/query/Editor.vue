<template>
  <v-expansion-panel class="mb-2">
    <v-expansion-panel-header elevation="3" outlined shaped tile>
      <h3>{{ queryObject.alias }}</h3>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row class="ma-1" justify="center" align="center">
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          min-width="150px"
          class="mr-2 px-5 py-2 text-lg-left"
        >
          FROM
        </v-card>
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          class="mr-2 px-5 py-2 flex-grow-1"
        >
          <!-- TODO select emitername -> emitterid -->
          <v-text-field
            v-model="queryObject.emitterId"
            hide-details="auto"
            class="ma-0 pa-0"
            dense
          ></v-text-field>
        </v-card>
      </v-row>
      <v-row class="ma-1" justify="center">
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          min-width="150px"
          class="mr-2 px-5 py-2"
        >
          SELECT
        </v-card>
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          class="mr-2 px-5 py-2 flex-grow-1"
        >
          <v-text-field
            v-model="queryObject.measurement"
            hide-details="auto"
            class="ma-0 pa-0"
            dense
          ></v-text-field>
        </v-card>
      </v-row>
      <v-row class="ma-1" justify="center">
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          min-width="150px"
          class="mr-2 px-5 py-2"
        >
          GROUPING
        </v-card>
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          class="mr-2 px-5 py-2 flex-grow-1"
        >
          <v-text-field
            v-model="queryObject.grouping"
            hide-details="auto"
            class="ma-0 pa-0"
            dense
          ></v-text-field>
        </v-card>
      </v-row>
      <v-row class="ma-1" justify="center">
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          min-width="150px"
          class="mr-2 px-5 py-2"
        >
          UNIT
        </v-card>
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          class="mr-2 px-5 py-2 flex-grow-1"
        >
          <v-text-field
            v-model="queryObject.unit"
            hide-details="auto"
            class="ma-0 pa-0"
            dense
          ></v-text-field>
        </v-card>
      </v-row>
      <v-row class="ma-1" justify="center">
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          min-width="150px"
          class="mr-2 px-5 py-2"
        >
          TYPE
        </v-card>
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          class="mr-2 px-5 py-2 flex-grow-1"
        >
          <!-- TODO select emitername -> emitterid -->
          <v-text-field
            v-model="queryObject.type"
            hide-details="auto"
            class="ma-0 pa-0"
            dense
          ></v-text-field>
        </v-card>
      </v-row>
      <v-row class="ma-1" justify="center">
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          min-width="150px"
          class="mr-2 px-5 py-2"
        >
          ALIAS
        </v-card>
        <v-card
          elevation="3"
          outlined
          shaped
          tile
          class="mr-2 px-5 py-2 flex-grow-1"
        >
          <v-text-field
            v-model="queryObject.alias"
            hide-details="auto"
            class="ma-0 pa-0"
            dense
          ></v-text-field>
        </v-card>
      </v-row>
      <v-btn class="mt-2 mx-1 py-2" primary @click="saveQuery"
        >Save query</v-btn
      >
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data: () => ({
    queryObject: {
      id: '',
      emitterId: '',
      measurement: '',
      unit: '',
      type: '',
      alias: '',
      grouping: '',
    },
  }),
  watch: {
    query: {
      deep: true,
      immediate: true,
      handler(val, old) {
        Object.assign(this.queryObject, val)
      },
    },
  },
  methods: {
    saveQuery() {
      this.$axios.$put(
        `api/graphs/${this.graphId}/queries/${this.queryObject.id}`,
        {
          emitterId: this.queryObject.emitterId,
          measurement: this.queryObject.measurement,
          unit: this.queryObject.unit,
          type: this.queryObject.type,
          alias: this.queryObject.alias,
          grouping: this.queryObject.grouping,
        }
      );
      // TODO await + handle errors

      console.log(this.queryObject)
    },
  },
  computed: {},
  props: {
    query: {
      type: Object,
      required: true,
    },
    graphId: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style>
</style>