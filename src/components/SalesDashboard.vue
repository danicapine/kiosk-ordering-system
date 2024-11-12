<template>
    <div class="container my-4 sales-dashboard">
      <div class="row">
        <div class="col text-center">
        </div>
      </div>
      <div class="row sales-summary text-center mb-4">
        <div class="col-md-4">
          <div class="card sales-card bg-primary text-white shadow">
            <div class="card-body">
              <p class="card-title mb-2">Today's Sales</p>
              <h2 class="card-text">₱{{ dailySales.toFixed(2) }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card sales-card bg-success text-white shadow">
            <div class="card-body">
              <p class="card-title mb-2">Monthly Sales</p>
              <h2 class="card-text">₱{{ monthlySales.toFixed(2) }}</h2>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card sales-card bg-warning text-dark shadow">
            <div class="card-body">
              <p class="card-title mb-2">Yearly Sales</p>
              <h2 class="card-text">₱{{ yearlySales.toFixed(2) }}</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h3 class="mb-3 text-center">Daily Sales History</h3>
          <table class="table table-striped table-bordered sales-history-table">
            <thead class="thead-dark">
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
  
  <style scoped>
  .sales-dashboard {
    text-align: center;
    max-width: 100%;
  }
  
  .sales-card {
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    transition: transform 0.2s;
  }
  
  .sales-card:hover {
    transform: scale(1.05);
  }
  
  .sales-summary .card {
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .sales-history-table {
    width: 100%;
    margin-top: 20px;
  }
  </style>
  