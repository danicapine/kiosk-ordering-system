import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import router from './router'; // Import the router

Vue.use(Vuetify);

const vuetify = new Vuetify();

new Vue({
  vuetify,
  router, // Add the router here
  render: h => h(App),
}).$mount('#app');
