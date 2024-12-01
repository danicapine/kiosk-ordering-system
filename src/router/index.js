import Vue from 'vue';
import Router from 'vue-router';
import AdminDash from '@/components/AdminDash.vue';
import LoginPage from '@/components/LoginPage.vue';  // Import LoginPage component
import KioskHome from '../components/KioskHome.vue';
import SecondPage from '../components/SecondPage.vue';
import MainMenu from '../components/MainMenu.vue';
import AdminOrders from '../components/CustomerOrder.vue';
import OrderQueue from '@/components/QueuePage.vue';
import ReviewOrder from '@/components/ReviewOrder.vue';
import PaymentOptions from '@/components/PaymentOptions.vue';
import OrderModeOptions from '@/components/OrderModeOptions.vue';
import ConfirmationScreen from "@/components/ConfirmationScreen.vue";
import AdminMenu from '@/components/AdminMenu.vue';
import SalesDashboard from '@/components/SalesDashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Use history mode to remove the hash (#) from the URL
  routes: [
    {
      path: '/',
      name: 'KioskHome',  // Set KioskHome as the default page
      component: KioskHome,
    },
    {
      path: '/login',  // Login page route
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/admin',
      name: 'AdminDash',
      component: AdminDash,
      beforeEnter: (to, from, next) => {
        // Check if the user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
          next('/login'); // Redirect to LoginPage if not logged in
        } else {
          next(); // Proceed to Admin Dashboard
        }
      }
    },
    {
      path: '/second-page',
      name: 'SecondPage',
      component: SecondPage,
    },
    {
      path: '/main-menu',
      name: 'MainMenu',
      component: MainMenu,
    },
    {
      path: '/admin',
      name: 'AdminOrders',
      component: AdminOrders,
    },
    {
      path: '/queue',
      name: 'OrderQueue',
      component: OrderQueue,
    },
    {
      path: '/review-order',
      name: 'ReviewOrder',
      component: ReviewOrder,
    },
    {
      path: '/payment-options',
      name: 'PaymentOptions',
      component: PaymentOptions,
    },
    {
      path: '/order-mode-options',
      name: 'OrderModeOptions',
      component: OrderModeOptions,
    },
    {
      path: "/confirmation",
      name: "ConfirmationScreen",
      component: ConfirmationScreen,
      props: route => ({ orderNumber: route.params.orderNumber }), // Pass orderNumber as prop
    },

    {
      path: '/admin-menu',
      name: 'AdminMenu',
      component: AdminMenu,
    },
    {
      path: '/sales-dashboard',
      name: 'SalesDashboard',
      component: SalesDashboard,
    },


    /* Uncomment if needed in the future
    {
      path: '/cashless-payment',
      name: 'CashlessPayment',
      component: CashlessPayment,
    },
    {
      path: '/cash-payment',
      name: 'CashPayment',
      component: CashPayment,
    },*/
  ],
});
