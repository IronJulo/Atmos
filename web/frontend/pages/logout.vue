<template>
  <div>
    <h1>Loging Out</h1>
  </div>
</template>

<script>
export default {
  name: 'lougout',
  async mounted() {
    const { refreshToken } = this.$auth.strategy
    console.log(refreshToken.get())
    await this.$auth.logout({
      data: { refreshToken: refreshToken.get() },
    })
  },
}
</script>

<style></style>