import Vue from 'vue';
import Router from 'vue-router';
import KioskHome from '../components/KioskHome.vue'; // Home screen for the kiosk
import SecondPage from '../components/SecondPage.vue'; // Additional page component
import MainMenu from '../components/MainMenu.vue'; // Main menu where items are selected
import AdminOrders from '../components/AdminOrders.vue'; // Admin page for viewing orders
import OrderQueue from '@/components/OrderQueue.vue';
import ReviewOrder from '@/components/ReviewOrder.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Optional: use history mode to remove the hash (#) from the URL
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
      path: '/main-menu', // Route for the Main Menu
      name: 'MainMenu',
      component: MainMenu,
    },
    {
      path: '/admin', // Route for the Admin Page
      name: 'AdminOrders',
      component: AdminOrders,
    },
    {
      path: '/queue', // Route for the Admin Page
      name: 'OrderQueue',
      component: OrderQueue,
    },
    {
      path: '/review-order', // Route for the Admin Page
      name: 'ReviewOrder',
      component: ReviewOrder,
    },
  ],
});
