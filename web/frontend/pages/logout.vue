<template>
  <div>
    <h1>Loging Out</h1>
  </div>
</template>

<script>
export default {
  name: 'lougout',
  async mounted() {
    try {
      const { refreshToken } = this.$auth.strategy
      const name = this.$auth.user.name
      await this.$auth.logout({ data: { refreshToken: refreshToken.get() } })
      this.$dialog.notify.success(`Goodbye ${name}`)

      this.$router.push('/')
    } catch (err) {
      this.$dialog.notify.error(
        'error ' + (err?.response?.data?.message || err?.message)
      )
    }
  },
}
</script>

<style></style>