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
        v-model="date"
        :label="label"
        :prepend-icon="icon"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      @input="
        menu = false
        $refs.menu.save(date)
      "
    >
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    date: '',
    menu: false,
  }),
  props: {
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    value: {
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