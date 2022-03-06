<template>
  <v-container fluid fill-height>
    <form-user-auth title="Login" buttonText="Login" @submit="loginUser" />
  </v-container>
</template>

<script>
export default {
  auth: false,

  methods: {
    async loginUser(loginInfo) {
      try {
        await this.$auth.loginWith('local', {
          data: loginInfo,
        })

        this.$dialog.notify.success(`Wellcome back ${this.$auth.user.name}`)
        this.$router.push('/')
      } catch (err) { 
        this.$dialog.notify.error('error ' + (err?.response?.data?.message || err?.message))
      }
    },
  },
}
</script>

<style></style>