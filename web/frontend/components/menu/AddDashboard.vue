<template>
  <div class="text-center">
    <v-menu
      ref="menu"
      v-model="menu"
      transition="slide-x-transition"
      :value="true"
      :close-on-content-click="false"
      :nudge-width="250"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
          <v-list-item-content>
            <div align="left">
              <v-icon small>mdi-plus</v-icon>
              Add
            </div>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-card>
        <v-card-title>Add new dashboard</v-card-title>
        <v-card-text>
          <v-text-field
            label="Dashboard name"
            v-model="dashboardName"
            prepend-icon="mdi-access-point"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ml-2 mb-2 mt-0" color="primary" @click="addDashboard">
            <v-icon class="pr-0 ma-1">mdi-plus</v-icon>
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    menu: false,
    dashboardName: '',
  }),
  props: {},
  methods: {
    async addDashboard() {
      await this.$axios.$post(`/api/dashboards/new`, {
        name: this.dashboardName,
      })
      this.$emit('dashboard-created')
    },
  },
  computed: {},
}
</script>