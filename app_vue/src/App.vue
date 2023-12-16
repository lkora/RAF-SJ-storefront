<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import router from './router' // assuming your router file is in the same directory

export default {
  name: 'App',
  components: {
  },
  router
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
