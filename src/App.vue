<template>
  <v-app>
    <router-view /> <!-- This will render the current route's component -->
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';
</style>
