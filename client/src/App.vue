<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.log('login on refresh')
    // login on refresh
  }
}
</script>

<style>

</style>
