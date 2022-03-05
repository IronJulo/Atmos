<template>
  <v-container fluid fill-height>
    <form-user-auth
      title="Register"
      buttonText="Register"
      @submit="registerUser"
      hasName
    />
  </v-container>
</template>

<script>
export default {
  auth: false,
  methods: {
    async registerUser(registerInfo) {
      await this.$axios.post('/api/auth/register', registerInfo);
      await this.$auth.loginWith('local', { data: registerInfo });
      this.$router.push('/')
    },
  },
}
</script>

<style>
</style>