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
      try {
        await this.$axios.post('/api/auth/register', registerInfo)
        await this.$auth.loginWith('local', { data: registerInfo })
        this.$dialog.notify.success(
          `Wellcome ${this.$auth.user.name} we hope that you'll like our software`
        )
        this.$router.push('/')
      } catch (err) {
        this.$dialog.notify.error(
          'error ' + (err?.response?.data?.message || err?.message)
        )
      }
    },
  },
}
</script>

<style>
</style>