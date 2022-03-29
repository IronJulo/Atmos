<template>
  <v-navigation-drawer permanent app>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img :src="require(`~/assets/images/maka.png`)"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{ this.$auth.user.name }}</v-list-item-title>
    </v-list-item>

    <v-divider />
    <v-list>
      <v-list-group v-if="devices" prepend-icon="mdi-access-point" no-action>
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Devices</v-list-item-title>
          </v-list-item-content>
        </template>

        <menu-add-device @device-created="$fetch" />
        <v-list-item
          v-for="device in devices"
          :key="device.id"
          :to="toDevice(device)"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-icon small>mdi-access-point</v-icon>
              {{ device.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group
        v-if="dashboards"
        prepend-icon="mdi-desktop-mac-dashboard"
        no-action
      >
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>Dashboards</v-list-item-title>
          </v-list-item-content>
        </template>
        <menu-add-dashboard @dashboard-created="$fetch" />

        <v-list-item
          v-for="dashboard in dashboards"
          :key="dashboard.id"
          :to="toDashboard(dashboard)"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-icon small>mdi-view-dashboard-variant-outline</v-icon>
              {{ dashboard.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-bottom-navigation slot="append">
      <v-btn href="https://github.com/IronJulo/Atmos">
        <span>Github</span>

        <v-icon>mdi-github</v-icon>
      </v-btn>

      <v-btn @click="toggleTheme">
        <span>Theme</span>

        <v-icon>mdi-compare</v-icon>
      </v-btn>

      <v-btn to="/logout">
        <span>Log-out</span>

        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      devices: [],
      dashboards: [],
    }
  },
  async fetch() {
    this.devices = await this.$axios.$get(`api/emitters/`)
    this.dashboards = await this.$axios.$get(`api/dashboards/`)
  },
  computed: {},
  methods: {
    toDevice(datasource) {
      return `/devices/${datasource.id}`
    },
    toDashboard(dashboard) {
      return `/dashboards/${dashboard.id}`
    },
    toggleTheme() {
      // Use storage to store the theme
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>
