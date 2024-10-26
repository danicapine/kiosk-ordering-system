import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  // Optional Vuetify options here
});

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app');
