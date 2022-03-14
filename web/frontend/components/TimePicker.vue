<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="model"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="time"
        :label="label"
        :prepend-icon="icon"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      format="24hr"
      v-model="time"
      @change="
        menu = false
        $refs.menu.save(time)
      "
    >
    </v-time-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    time: '',
    menu: false,
  }),
  props: {
    value: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style>
</style>