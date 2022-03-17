<template>
  <v-container fluid fill-height>
    <form-register @submit="registerUser" />
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
          `Welcome ${this.$auth.user.name} we hope that you'll like our software`
        )
        this.$router.push('/')
      } catch (err) {
        this.$dialog.notify.error(
          'Error ' + (err?.response?.data?.message || err?.message)
        )
      }
    },
  },
}
</script>

<style>
</style>