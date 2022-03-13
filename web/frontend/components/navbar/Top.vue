<template>
  <v-app-bar app>
    
    <v-toolbar-title>{{ label }}</v-toolbar-title>
    <v-spacer />
    <menu-edit-global-queries :from.sync="dateFrom" :to.sync="dateTo" class="mr-2"/>
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
    <v-icon left>mdi-cog-outline</v-icon>
    <v-switch v-model="editorModeModel" outlined label="edit" />
    <h1>{{dateFrom}}{{dateTo}}</h1>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      dateFrom: "",
      dateTo: "",

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
      required: true
    },
    editorMode: {
      type: Boolean,
      required: true
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
  },
}
</script>
