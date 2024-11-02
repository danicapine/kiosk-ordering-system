import Vue from 'vue';
import Router from 'vue-router';
import KioskHome from '../components/KioskHome.vue'; // Home screen for the kiosk
import SecondPage from '../components/SecondPage.vue'; // Additional page component
import MainMenu from '../components/MainMenu.vue'; // Main menu where items are selected
import AdminOrders from '../components/AdminOrders.vue'; // Admin page for viewing orders
import OrderQueue from '@/components/OrderQueue.vue';
import ReviewOrder from '@/components/ReviewOrder.vue';
import PaymentOptions from '@/components/PaymentOptions.vue'; // New payment options component
import OrderModeOptions from '@/components/OrderModeOptions.vue';
import ConfirmationScreen from "@/components/ConfirmationScreen.vue";
/*import CashlessPayment from '@/components/CashlessPayment.vue'; // New cashless payment component
import CashPayment from '@/components/CashPayment.vue'; // New cash payment component*/

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
      path: '/queue', // Route for the Order Queue
      name: 'OrderQueue',
      component: OrderQueue,
    },
    {
      path: '/review-order', // Route for the Review Order Page
      name: 'ReviewOrder',
      component: ReviewOrder,
    },
    {
      path: '/payment-options', // New route for the Payment Options page
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
      props: route => ({ orderNumber: route.params.orderNumber })
    },
    /*{
      path: '/cashless-payment', // New route for the Cashless Payment page
      name: 'CashlessPayment',
      component: CashlessPayment,
    },
    {
      path: '/cash-payment', // New route for the Cash Payment page
      name: 'CashPayment',
      component: CashPayment,
    },*/
  ],
});
