<template>
  <div class="container order-queue">
    <h1 class="text-center my-4">Order Queue</h1>

    <div class="row">
      <!-- Preparing Orders -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-dark text-white">Now Preparing</div>
          <ul class="list-group list-group-flush">
            <li v-for="order in inProgressOrders" :key="order.id" class="list-group-item">
              {{ order.orderNumber }}
            </li>
            <li v-if="inProgressOrders.length === 0" class="list-group-item text-muted">No orders in progress</li>
          </ul>
        </div>
      </div>

      <!-- Now Serving Orders -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-primary text-white">Now Serving</div>
          <ul class="list-group list-group-flush">
            <li v-for="order in nowServingOrders" :key="order.id" class="list-group-item">
              {{ order.orderNumber }}
            </li>
            <li v-if="nowServingOrders.length === 0" class="list-group-item text-muted">No orders currently being served</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/config/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default {
  name: "OrderQueue",
  data() {
    return {
      orders: [],
    };
  },
  computed: {
    // Filtered lists for orders in progress and now serving
    inProgressOrders() {
      return this.orders.filter((order) => order.status === "Preparing");
    },
    nowServingOrders() {
      return this.orders.filter((order) => order.status === "Ready");
    },
  },
  created() {
    this.fetchOrders(); // Real-time updates for orders
  },
  methods: {
    // Fetch Orders in Real-Time
    fetchOrders() {
      const ordersCollection = collection(db, "orders");
      onSnapshot(ordersCollection, (snapshot) => {
        this.orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          orderNumber: doc.data().orderNumber || doc.id,
          ...doc.data(),
        }));
      });
    },
  },
};
</script>

<style scoped>
.order-queue {
  padding: 20px;
}

.order-queue .card {
  margin-bottom: 20px;
}
</style>
