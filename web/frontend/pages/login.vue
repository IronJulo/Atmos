<template>
  <v-container fluid fill-height>
    <form-user-auth title="Login" buttonText="Login" @submit="submitAuth" />
  </v-container>
</template>

<script>
export default {
  methods: {
    async submitAuth(loginInfo) {
      console.log('loginInfo')
      console.log(loginInfo)
      await this.$auth.loginWith('local', {
        data: loginInfo,
      })
      console.log(this.$auth)
      this.$router.push('/')
    },
  },
}
</script>

<style></style>