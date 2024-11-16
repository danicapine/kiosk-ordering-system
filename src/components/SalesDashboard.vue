<template>
  <div class="container my-4 sales-dashboard">
    <!-- Sales Summary -->
    <div class="row sales-summary text-center mb-4">
      <div class="col-md-4">
        <div class="card sales-card bg-coffee-dark text-white shadow">
          <div class="card-body">
            <p class="card-title mb-2">Today's Sales</p>
            <h2 class="card-text">₱{{ dailySales.toFixed(2) }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card sales-card bg-coffee text-white shadow">
          <div class="card-body">
            <p class="card-title mb-2">Monthly Sales</p>
            <h2 class="card-text">₱{{ monthlySales.toFixed(2) }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card sales-card bg-coffee-light text-dark shadow">
          <div class="card-body">
            <p class="card-title mb-2">Yearly Sales</p>
            <h2 class="card-text">₱{{ yearlySales.toFixed(2) }}</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Sales History -->
    <div class="row">
      <div class="col">
        <h3 class="mb-3 text-center">Daily Sales History</h3>
        <table class="table table-striped table-bordered sales-history-table">
          <thead class="thead-coffee">
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Total Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, index) in dailySalesHistory" :key="index">
              <td>{{ formatDate(record.date) }}</td>
              <td>₱{{ record.totalSales.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../config/firebaseConfig";
import { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default {
  name: "SalesDashboard",
  data() {
    return { dailySales: 0, monthlySales: 0, yearlySales: 0, dailySalesHistory: [] };
  },
  methods: {
    calculateDailySales() {
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());
      const q = query(collection(db, "sales"), where("saleDate", ">=", todayStart), where("saleDate", "<=", todayEnd));
      onSnapshot(q, (snapshot) => { this.dailySales = snapshot.docs.reduce((total, doc) => total + doc.data().total, 0); });
    },
    calculateMonthlySales() {
      const monthStart = startOfMonth(new Date());
      const monthEnd = endOfMonth(new Date());
      const q = query(collection(db, "sales"), where("saleDate", ">=", monthStart), where("saleDate", "<=", monthEnd));
      onSnapshot(q, (snapshot) => { this.monthlySales = snapshot.docs.reduce((total, doc) => total + doc.data().total, 0); });
    },
    calculateYearlySales() {
      const yearStart = startOfYear(new Date());
      const yearEnd = endOfYear(new Date());
      const q = query(collection(db, "sales"), where("saleDate", ">=", yearStart), where("saleDate", "<=", yearEnd));
      onSnapshot(q, (snapshot) => { this.yearlySales = snapshot.docs.reduce((total, doc) => total + doc.data().total, 0); });
    },
    fetchDailySalesHistory() {
      const q = query(collection(db, "sales"));
      onSnapshot(q, (snapshot) => {
        const salesByDate = {};
        snapshot.docs.forEach((doc) => {
          const sale = doc.data();
          const date = this.formatDate(sale.saleDate.toDate());
          if (!salesByDate[date]) { salesByDate[date] = 0; }
          salesByDate[date] += sale.total;
        });
        this.dailySalesHistory = Object.keys(salesByDate).map((date) => ({ date: new Date(date), totalSales: salesByDate[date] }));
      });
    },
    formatDate(date) { return date.toLocaleDateString(); },
  },
  mounted() {
    this.calculateDailySales();
    this.calculateMonthlySales();
    this.calculateYearlySales();
    this.fetchDailySalesHistory();
  },
};
</script>

<style>
/* Import a Café-Inspired Font */
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap');

:root {
  --coffee-dark: #4e342e;
  --coffee-medium: #6d4c41;
  --coffee-light: #d7ccc8;
  --coffee-bg: #f5f5f5;
}

.sales-dashboard {
  text-align: center;
  max-width: 100%;
  font-family: 'Roboto', sans-serif; /* Apply the café-themed font */
  background-color: var(--coffee-bg);
  padding: 20px;
  border-radius: 10px;
}

/* Card Styles */
.sales-card {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.sales-card:hover {
  transform: scale(1.05);
}

.bg-coffee-dark {
  background-color: var(--coffee-dark) !important;
}

.bg-coffee {
  background-color: var(--coffee-medium) !important;
}

.bg-coffee-light {
  background-color: var(--coffee-light) !important;
}

/* Sales History Table */
.sales-history-table {
  width: 100%;
  margin-top: 20px;
}

.thead-coffee {
  background-color: var(--coffee-dark);
  color: #fff;
}

.table th,
.table td {
  padding: 12px;
  font-size: 1em;
  font-family: 'Roboto', sans-serif; /* Ensure the font is applied in tables */
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: var(--coffee-light);
}

/* Text color styling */
.text-white {
  color: #fff;
}

.text-dark {
  color: #000;
}
</style>
