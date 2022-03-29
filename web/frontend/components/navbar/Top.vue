<template>
  <v-app-bar app>
    <v-toolbar-title>{{ label }}</v-toolbar-title>
    <v-spacer />
    <menu-edit-global-queries
      :date-from.sync="dateFromModel"
      :date-to.sync="dateToModel"
      :hour-from.sync="hourFromModel"
      :hour-to.sync="hourToModel"
      class="mr-2"
    />
    <v-select
      class="mr-2"
      v-model="autorefresh"
      :hint="`Refresh every ${autorefresh.text}`"
      :items="items"
      label="Select"
      persistent-hint
      return-object
      single-line
      style="max-width: 150px"
    >
      <template #prepend-inner>
        <v-icon>mdi-refresh</v-icon>
      </template>
    </v-select>
    <v-switch v-if="editable" v-model="editorModeModel" outlined label="edit" />
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      autorefresh: { text: '30s', value: 30 },
      items: [
        { text: '5s', value: 5 },
        { text: '10s', value: 10 },
        { text: '30s', value: 30 },
      ],
      menue: false,
    }
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    editorMode: {
      type: Boolean,
      required: true,
    },
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
    editable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    editorModeModel: {
      get() {
        return this.editorMode
      },
      set(value) {
        this.$emit('update:editorMode', value)
      },
    },
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
