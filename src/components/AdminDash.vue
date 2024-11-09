<template>
  <div :class="['admin-dashboard', { 'toggled': isToggled }]" id="wrapper">
    <!-- Sidebar -->
    <div class="sidebar" id="sidebar-wrapper">
      <div class="logo-section">
        <img src="@/assets/apple-touch-icon.png" alt="Chillax Cafe Logo" class="logo" />
        <h2 class="sidebar-heading">Chillax Cafe Admin</h2>
      </div>
      <div class="list-group list-group-flush">
        <button @click="showSection('dashboard')" :class="['list-group-item', { active: activeSection === 'dashboard' }]">Home</button>
        <button @click="showSection('orders')" :class="['list-group-item', { active: activeSection === 'orders' }]">Orders</button>
        <button @click="showSection('menu')" :class="['list-group-item', { active: activeSection === 'menu' }]">Menu</button>
        <button @click="showSection('categories')" :class="['list-group-item', { active: activeSection === 'categories' }]">Categories</button>
        <button @click="showSection('users')" :class="['list-group-item', { active: activeSection === 'users' }]">Users</button>
      </div>
    </div>

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container mt-4">
        <h1 class="text-center mb-4">{{ getSectionTitle }}</h1>

        <!-- Dashboard Section -->
        <div v-if="activeSection === 'dashboard'" class="overview">
          <div class="card-container">
            <div class="card">
              <p>Today's Sales</p>
              <h5>₱{{ dailySales.toFixed(2) }}</h5>
            </div>
            <div class="card">
              <p>Monthly Sales</p>
              <h5>₱{{ monthlySales.toFixed(2) }}</h5>
            </div>
            <div class="card">
              <p>Yearly Sales</p>
              <h5>₱{{ yearlySales.toFixed(2) }}</h5>
            </div>
          </div>

          <!-- Historical Daily Sales Table -->
          <h3 class="mt-5">Daily Sales History</h3>
          <table class="table table-striped mt-3">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in previousDailySales" :key="index">
                <td>{{ formatDate(record.date) }}</td>
                <td>₱{{ record.totalSales.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="activeSection === 'orders'" class="orders">
          <CustomerOrder @markReady="updateOrderStatus" />
        </div>

        <div v-if="activeSection === 'menu'" class="menu">
          <h2 class="mb-3">Recent Menu Items</h2>
          <table class="table table-striped">
            <thead class="thead-light">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Available?</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td>{{ product.id }}</td>
                <td><img :src="product.image" alt="Product Image" class="product-image" /></td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>₱{{ product.price.toFixed(2) }}</td>
                <td><span class="badge badge-success">Available</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CustomerOrder from '@/components/CustomerOrder.vue';
import { db } from '../config/firebaseConfig';
import { startOfDay, endOfDay } from 'date-fns';
import { collection, query, where, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore';

export default {
  components: {
    CustomerOrder,
  },
  data() {
    return {
      activeSection: 'dashboard',
      isToggled: false,
      dailySales: 0,
      monthlySales: 0,
      yearlySales: 0,
      previousDailySales: [],
      products: [
        // Your product data
      ],
    };
  },
  computed: {
    getSectionTitle() {
      switch (this.activeSection) {
        case 'dashboard':
          return 'Overview';
        case 'categories':
          return 'Categories';
        case 'menu':
          return 'Menu';
        case 'orders':
          return 'Customer Orders';
        case 'users':
          return 'Users';
        default:
          return 'Overview';
      }
    },
  },
  methods: {
    showSection(section) {
      this.activeSection = section;
    },
    async calculateDailySales() {
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());

      const q = query(
        collection(db, 'sales'),
        where('saleDate', '>=', todayStart),
        where('saleDate', '<=', todayEnd),
        where('status', '==', 'Ready')
      );

      onSnapshot(q, (snapshot) => {
        this.dailySales = snapshot.docs.reduce((total, doc) => {
          const sale = doc.data();
          return total + (sale.total || 0);
        }, 0);
      });
    },
    async saveDailySalesAndReset() {
      if (this.dailySales > 0) {
        try {
          await addDoc(collection(db, 'dailySalesHistory'), {
            date: new Date(),
            totalSales: this.dailySales,
          });
          this.dailySales = 0;
        } catch (error) {
          console.error('Error saving daily sales:', error);
        }
      }
    },
    async updateOrderStatus(orderId) {
      try {
        const orderRef = doc(db, 'sales', orderId);
        await updateDoc(orderRef, { status: 'Ready' });
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    },
    formatDate(date) {
      return date.toDate().toLocaleDateString();
    },
    scheduleDailyReset() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);

      const timeUntilMidnight = midnight - now;
      this.dailyResetTimer = setTimeout(() => {
        this.saveDailySalesAndReset();
        this.scheduleDailyReset();
      }, timeUntilMidnight);
    },
  },
  async mounted() {
    await this.calculateDailySales();
    this.scheduleDailyReset();
  },
  beforeUnmount() {
    clearTimeout(this.dailyResetTimer);
  },
};
</script>

  <style scoped>
  :root {
    --sidebar-bg-gradient: linear-gradient(135deg, #4e342e, #6d4c41);
    --sidebar-hover-color: #5d4037;
    --sidebar-text-color: #ffffff;
    --content-bg-color: #f1e3d3;
    --text-color-dark: #4e342e;
    --text-color-light: #ffffff;
    --card-hover-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    --button-gradient: linear-gradient(135deg, #8B4513, #A0522D);
    --button-hover-gradient: linear-gradient(135deg, #A0522D, #8B4513);
  }
  
  .admin-dashboard {
    display: flex;
    flex-direction: row;
  }
  
  /* Sidebar Styles */
  #sidebar-wrapper {
    width: 230px;
    background: var(--sidebar-bg-gradient);
    color: var(--sidebar-text-color);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }
  
  .logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    background-color: var(--sidebar-hover-color);
  }
  
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  
  .sidebar-heading {
    font-size: 1.8em;
    color: var(--text-color-light);
    font-weight: bold;
    letter-spacing: 1px;
    text-align: center;
  }
  
  .list-group-item {
    background-color: #ffffff;
    color: var(--text-color-dark);
    font-size: 1.2em;
    font-weight: 500;
    border: none;
    padding: 15px 25px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    border-radius: 10px;
    margin: 8px 15px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 -4px 6px rgba(0, 0, 0, 0.2), 4px 0 6px rgba(0, 0, 0, 0.2), -4px 0 6px rgba(0, 0, 0, 0.2);
  }
  
  .list-group-item.active {
    background-color: #6d4c41;
    color: var(--text-color-light);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2), 0 -6px 10px rgba(0, 0, 0, 0.2), 6px 0 10px rgba(0, 0, 0, 0.2), -6px 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .list-group-item:hover {
    background-color: #5d4037;
    color: var(--text-color-light);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2), 0 -6px 10px rgba(0, 0, 0, 0.2), 6px 0 10px rgba(0, 0, 0, 0.2), -6px 0 10px rgba(0, 0, 0, 0.2);
  }
  
  /* Page Content Wrapper */
  #page-content-wrapper {
    margin-left: 250px;
    width: calc(100% - 250px);
    background-color: var(--content-bg-color);
    padding-top: 20px;
    padding-bottom: 20px;
    transition: margin-left 0.3s ease;
  }
  
  .navbar {
    padding: 10px 20px;
  }
  
  .container {
    padding: 20px;
  }
  
  /* Card Container */
  .card-container {
    display: flex;
    gap: 2rem;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .card {
    flex: 1;
    padding: 25px;
    border-radius: 10px;
    background-color: var(--content-bg-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    min-width: 200px;
    max-width: 300px;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-hover-shadow);
  }
  
  .card p {
    color: var(--text-color-dark);
    font-size: 1em;
    font-weight: 600;
    margin-bottom: 0.3em;
  }
  
  .card h5 {
    color: var(--text-color-dark);
    font-weight: bold;
    font-size: 1.8em;
  }
  
  .card-link {
    color: var(--text-color-dark);
    font-size: 0.9em;
    text-decoration: underline;
    cursor: pointer;
  }
  
  /* Table Styles */
  .orders {
    overflow-x: auto;
  }
  
  .table {
    width: 100%;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    #sidebar-wrapper {
      width: 200px;
    }
  
    #page-content-wrapper {
      margin-left: 200px;
      width: calc(100% - 200px);
    }
  }
  
  @media (max-width: 768px) {
    .admin-dashboard {
      flex-direction: column;
    }
  
    #sidebar-wrapper {
      width: 100%;
      height: auto;
      position: relative;
    }
  
    #page-content-wrapper {
      margin-left: 0;
      width: 100%;
    }
  
    .card-container {
      flex-direction: column;
      align-items: center;
    }
  }
  
  @media (max-width: 576px) {
    .list-group-item {
      padding: 10px 15px;
      font-size: 1em;
    }
  
    .card {
      padding: 20px;
      font-size: 0.9em;
    }
  
    .table th, .table td {
      padding: 8px;
      font-size: 0.8em;
      white-space: nowrap;
    }
  }
  </style>