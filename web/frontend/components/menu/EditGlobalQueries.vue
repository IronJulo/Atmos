<template>
  <div class="text-center">
    <v-menu
      ref="menu"
      v-model="menu"
      transition="slide-x-transition"
      :value="true"
      :close-on-content-click="false"
      :nudge-width="500"
      offset-x
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined primmary v-bind="attrs" v-on="on">
          {{ selectedTimeRange() }}
        </v-btn>
      </template>

      <v-card>
        <v-container>
          <v-row>
            <v-col cols="8">
              <h4 class="pa-1">Absolute time range</h4>
              <date-picker v-model="fromModel" />
              <date-picker v-model="toModel" />
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="4">
              <v-autocomplete
                class="pa-0"
                label="Search quick time ranges"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    menu: false,
    dateFrom: '',
    dateTo: '',
  }),
  props: {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    selectedTimeRange() {
      return `last 5 hours`
    },
  },
  computed: {
    fromModel: {
      get() {
        return this.from
      },
      set(value) {
        this.$emit('update:from', value)
      },
    },
    toModel: {
      get() {
        return this.to
      },
      set(value) {
        this.$emit('update:to', value)
      },
    },
  },
}
</script>