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
          <v-select
            v-model="queryObject.emitterId"
            hide-details="auto"
            class="ma-0 pa-0"
            :items="this.emitters"
            item-value="id"
            item-text="name"
            dense
          ></v-select>
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
          <v-select
            v-model="queryObject.grouping"
            hide-details="auto"
            class="ma-0 pa-0"
            :items="['1s', '1m', '1h', '1d', '1w', '1m', '1y']"
            dense
          ></v-select>
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
          <v-select
            v-model="queryObject.type"
            hide-details="auto"
            class="ma-0 pa-0"
            :items="['line', 'bar']"
            dense
          ></v-select>
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
      <div class="d-flex justify-space-between">
        <v-btn class="pa-1 pl-3 pr-3 mt-5" color="primary" @click="saveQuery">
          <v-icon class="pr-0 mr-1">mdi-content-save-outline</v-icon>
          Save query
        </v-btn>
        <v-btn class="pa-1 pr-3 mt-5" color="error" @click="deleteQuery">
          <v-icon class="pr-0 ma-1">mdi-minus</v-icon>
          Delete query
        </v-btn>
      </div>
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
        this.queryObject
      )
      // TODO await + handle errors + notif + loading
    },
    deleteQuery() {
      this.$axios.$delete(
        `api/graphs/${this.graphId}/queries/${this.queryObject.id}`,
        this.queryObject
      )
      this.$emit('deleted-query', this.queryObject)
      // TODO await + handle errors + notif + loading
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
    emitters: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
</style>