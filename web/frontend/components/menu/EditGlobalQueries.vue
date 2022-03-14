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
      class="pr-10"
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
              <v-row>
                <v-col cols="5">
                  <h4 class="pa-1">Absolute time range</h4>
                  <date-picker
                    v-model="dateFromModel"
                    label="From"
                    icon="mdi-calendar-outline"
                  />
                  <date-picker
                    v-model="dateToModel"
                    label="To"
                    icon="mdi-calendar-outline"
                  />
                </v-col>
                <v-col cols="5">
                  <h4 class="pa-1">Absolute time range</h4>
                  <time-picker
                    v-model="hourFromModel"
                    label="From"
                    icon="mdi-clock-outline"
                  />
                  <time-picker
                    v-model="hourToModel"
                    label="To"
                    icon="mdi-clock-outline"
                  />
                </v-col>
                <v-col cols="2"> </v-col>
              </v-row>
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
  }),
  props: {
    dateFrom: {
      type: String,
      required: true,
    },
    dateTo: {
      type: String,
      required: true,
    },
    hourFrom: {
      type: String,
      required: true,
    },
    hourTo: {
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
    dateFromModel: {
      get() {
        return this.dateFrom
      },
      set(value) {
        this.$emit('update:date-from', value)
      },
    },
    dateToModel: {
      get() {
        return this.dateTo
      },
      set(value) {
        this.$emit('update:date-to', value)
      },
    },
    hourFromModel: {
      get() {
        return this.hourFrom
      },
      set(value) {
        this.$emit('update:hour-from', value)
      },
    },
    hourToModel: {
      get() {
        return this.hourTo
      },
      set(value) {
        this.$emit('update:hour-to', value)
      },
    },
  },
}
</script>