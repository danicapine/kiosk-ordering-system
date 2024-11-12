<template>
  <div :class="['admin-dashboard', { 'toggled': isToggled }]" id="wrapper">
    <!-- Sidebar -->
    <div class="sidebar" id="sidebar-wrapper">
      <div class="logo-section">
        <img src="@/assets/apple-touch-icon.png" alt="Chillax Cafe Logo" class="logo" />
        <h2 class="sidebar-heading">Chillax Cafe Admin</h2>
      </div>
      <div class="list-group list-group-flush">
        <!-- Home Button to display SalesDashboard -->
        <button @click="showSection('home')" :class="['list-group-item', { active: activeSection === 'home' }]">Home</button>
        
        <!-- Other sections -->
        <button @click="showSection('orders')" :class="['list-group-item', { active: activeSection === 'orders' }]">Orders</button>
        <button @click="showSection('menu')" :class="['list-group-item', { active: activeSection === 'menu' }]">Menu</button>
  
      </div>
    </div>

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container mt-4">
        <h1 class="text-center mb-4">{{ getSectionTitle }}</h1>

        <!-- Home Section - SalesDashboard Component -->
        <div v-if="activeSection === 'home'">
          <SalesDashboard />
        </div>

        <!-- Orders Section -->
        <div v-if="activeSection === 'orders'" class="orders">
          <CustomerOrder @markReady="updateOrderStatus" />
        </div>

        <!-- Menu Management Section -->
        <div v-if="activeSection === 'menu'" class="menu">
          <AdminMenu />
        </div>

        <!-- Other Sections can be added similarly here -->
      </div>
    </div>
  </div>
</template>

<script>
import CustomerOrder from "@/components/CustomerOrder.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import SalesDashboard from "@/components/SalesDashboard.vue"; // Import the SalesDashboard component

export default {
  components: {
    CustomerOrder,
    AdminMenu,
    SalesDashboard, // Register SalesDashboard
  },
  data() {
    return {
      activeSection: "home", // Default section set to "home"
      isToggled: false,
    };
  },
  computed: {
    getSectionTitle() {
      switch (this.activeSection) {
        case "home":
          return "Sales Dashboard"; // Title for Sales Dashboard
        case "orders":
          return "Customer Orders";
        case "menu":
          return "Menu Management";
        case "categories":
          return "Categories";
        case "users":
          return "Users";
        default:
          return "Overview";
      }
    },
  },
  methods: {
    showSection(section) {
      this.activeSection = section;
    },
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
    width: 220px;
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
    margin-left: 236px;
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