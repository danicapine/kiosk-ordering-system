import Vue from 'vue';
import Router from 'vue-router';
import KioskHome from '../components/KioskHome.vue'; // Adjust the path if necessary
import SecondPage from '../components/SecondPage.vue'; // Ensure this path is correct
import MainMenu from '../components/MainMenu.vue'; // Import your MainMenu component

Vue.use(Router);

export default new Router({
  mode: 'history', // Optional: use history mode to remove hash from URL
  routes: [
    {
      path: '/',
      name: 'KioskHome',
      component: KioskHome,
    },
    {
      path: '/second-page',
      name: 'SecondPage',
      component: SecondPage,
    },
    {
      path: '/main-menu', // Add the route for the Main Menu
      name: 'MainMenu',
      component: MainMenu, // Ensure this component exists
    },
  ],
});
