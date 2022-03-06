<template>
  <v-layout align-center justify-center>
    <v-card class="elevation-12" width="600">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Register</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field v-model="authInfo.name" label="Name" />
          <v-text-field v-model="authInfo.email" label="Email" />
          <v-text-field
            v-model="authInfo.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            counter="true"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-card-actions d-flex justify-space-between>
        <v-btn to="/login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    showPassword: false,
    authInfo: {
      name: 'Jules',
      email: 'Jules.Brossier@Iron.dev',
      password: 'Password',
    },
  }),
  methods: {
    submit() {
      this.$emit('submit', this.authInfo)
    },
  },
}
</script>

<style>
</style>