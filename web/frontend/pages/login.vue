<template>
  <v-container fluid fill-height>
    <form-user-auth title="Login" buttonText="Login" @submit="loginUser" />
  </v-container>
</template>

<script>
export default {
  $auth: false,
  methods: {
    async loginUser(loginInfo) {
      await this.$auth.loginWith('local', { data: loginInfo })
      this.$router.push('/') // TODO redirect to previous page
    },
  },
}
</script>

<style></style>