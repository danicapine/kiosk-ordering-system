<template>
  <v-app>
    <KioskHome /> <!-- Include the KioskHome component -->
  </v-app>
</template>

<script>
import KioskHome from './components/KioskHome.vue'; // Import the KioskHome component

export default {
  name: 'App',
  components: {
    KioskHome, // Register the KioskHome component
  },
};
</script>

<style>
@import '~vuetify/dist/vuetify.min.css'; /* Ensure Vuetify styles are included */
</style>
