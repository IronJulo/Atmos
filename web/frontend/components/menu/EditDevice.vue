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
              <v-icon small>mdi-access-point</v-icon>
              {{ deviceName }}

            </div>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-card>
        <v-card-title>Add new device</v-card-title>
        <v-card-text>
          <v-text-field
            label="Device name"
            v-model="deviceNameModel"
            prepend-icon="mdi-access-point"
          ></v-text-field>
          <v-text-field
            label="Device api key"
            v-model="devicedeviceKey"
            prepend-icon="mdi-key-wireless"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ml-2 mb-2 mt-0" color="primary" @click="addDevice">
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
  props: {
    deviceName: {
      type: String,
      required: true,
    },
    deviceKey: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    menu: false,
    deviceNameModel: '',
    deviceKeyModel: '',
  }),
  methods: {
    async addDevice() {
      await this.$axios.$post(`/api/emitters/new`, {
        name: this.deviceName,
        key: this.deviceKey,
      })
      this.$emit('device-created')
    },
  },
  computed: {},
}
</script>
