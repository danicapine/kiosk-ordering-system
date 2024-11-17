<template>
  <div :class="['admin-dashboard', { 'toggled': isToggled }]" id="wrapper">
    <!-- Sidebar -->
    <div class="sidebar" id="sidebar-wrapper">
      <div class="logo-section">
        <img src="@/assets/apple-touch-icon.png" alt="Chillax Cafe Logo" class="logo" />
        <h2 class="sidebar-heading">Chillax Cafe Admin</h2>
      </div>
      <div class="list-group list-group-flush">
        <!-- Sidebar Navigation with Icons -->
        <button @click="showSection('home')" :class="['list-group-item', { active: activeSection === 'home' }]">
          <i class="fas fa-home"></i> Home
        </button>
        <button @click="showSection('orders')" :class="['list-group-item', { active: activeSection === 'orders' }]">
          <i class="fas fa-receipt"></i> Orders
        </button>
        <button @click="showSection('menu')" :class="['list-group-item', { active: activeSection === 'menu' }]">
          <i class="fas fa-utensils"></i> Menu
        </button>
        <button @click="showSection('inventory')" :class="['list-group-item', { active: activeSection === 'inventory' }]">
          <i class="fas fa-boxes"></i> Inventory
        </button>
      </div>
    </div>

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <div class="container mt-4">
        <h1 class="text-center mb-4">{{ getSectionTitle }}</h1>
        <div v-if="activeSection === 'home'">
          <SalesDashboard />
        </div>
        <div v-if="activeSection === 'orders'" class="orders">
          <CustomerOrder @markReady="updateOrderStatus" />
        </div>
        <div v-if="activeSection === 'menu'" class="menu">
          <AdminMenu />
        </div>
        <!-- Inventory Section -->
        <div v-if="activeSection === 'inventory'" class="inventory">
          <InventoryDashboard />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerOrder from "@/components/CustomerOrder.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import SalesDashboard from "@/components/SalesDashboard.vue";
//import InventoryDashboard from "@/components/InventoryDashboard.vue";

export default {
  components: {
    CustomerOrder,
    AdminMenu,
    SalesDashboard,
    //InventoryDashboard,
  },
  data() {
    return {
      activeSection: "home",
      isToggled: false,
    };
  },
  computed: {
    getSectionTitle() {
      switch (this.activeSection) {
        case "home":
          return "Sales Dashboard";
        case "orders":
          return "Customer Orders";
        case "menu":
          return "Menu Management";
        case "inventory":
          return "Inventory Management";
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

/* Root Theme Colors */
:root {
  --sidebar-bg-gradient: linear-gradient(135deg, #3b2c28, #705c55);
  --sidebar-hover-color: #6d4c41;
  --sidebar-text-color: #ffffff;
  --content-bg-color: #f4e9e3;
  --text-color-dark: #3b2c28;
  --text-color-light: #ffffff;
  --card-hover-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.sidebar-heading {
  font-size: 1.5em;
  color: var(--text-color-light);
  font-weight: bold;
  text-align: center;
}

.list-group-item {
  display: flex;
  align-items: center;
  justify-content: center; /* Center-align content */
  gap: 10px;
  background-color: #ffffff;
  color: var(--text-color-dark);
  font-size: 1.1em;
  font-weight: 500;
  border: none;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 10px;
  margin: 10px auto; /* Center buttons horizontally */
  width: 90%; /* Adjust width to keep spacing balanced */
  text-align: center;
}

.list-group-item.active {
  background-color: #5d4037;
  color: #ffffff;
  transform: translateY(-2px);
}

.list-group-item:hover {
  color: #ffffff;
  background-color: #5d4037;
  transform: translateY(-2px);
}

/* Page Content Wrapper */
#page-content-wrapper {
  margin-left: 236px;
  width: calc(100% - 250px);
  background-color: var(--content-bg-color);
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.container {
  padding: 20px;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  #sidebar-wrapper {
    width: 200px;
  }
  #page-content-wrapper {
    margin-left: 200px;
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: center; /* Center align sidebar items */
  }

  #page-content-wrapper {
    margin-left: 0;
    width: 100%;
    padding: 10px;
  }

  .list-group-item {
    font-size: 1em;
    padding: 10px;
    margin: 5px;
    width: calc(50% - 10px);
  }
}

@media (max-width: 576px) {
  .list-group-item {
    font-size: 0.9em;
    padding: 8px;
    width: 100%;
  }

  .container {
    padding: 15px;
  }
}
</style>