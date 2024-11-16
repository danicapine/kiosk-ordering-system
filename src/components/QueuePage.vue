<template>
  <div class="container-fluid order-queue">
    <h1 class="text-center my-4">Order Queue</h1>

    <div class="row">
      <!-- Preparing Orders -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-coffee-dark text-light">Now Preparing</div>
          <ul class="list-group list-group-flush">
            <li v-for="order in inProgressOrders" :key="order.id" class="list-group-item order-number">
              {{ order.orderNumber }}
            </li>
            <li v-if="inProgressOrders.length === 0" class="list-group-item text-muted">No orders in progress</li>
          </ul>
        </div>
      </div>

      <!-- Now Serving Orders -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-coffee-light text-brown">Now Serving</div>
          <ul class="list-group list-group-flush">
            <li v-for="order in nowServingOrders" :key="order.id" class="list-group-item order-number">
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
    inProgressOrders() {
      return this.orders.filter((order) => order.status === "Preparing");
    },
    nowServingOrders() {
      return this.orders.filter((order) => order.status === "Ready");
    },
  },
  created() {
    this.fetchOrders();
  },
  methods: {
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
/* Café-inspired color theme */
:root {
  --coffee-dark: #4e342e;
  --coffee-light: #d7b89e;
  --cream: #f3e5ab;
  --text-muted: #8b7e74;
  --text-light: #f3e5e5;
}

.order-queue {
  padding: 20px;
  width: 100%;
  min-height: 100vh;
  background-color: var(--cream);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.order-queue h1 {
  color: var(--coffee-dark);
}

/* Card styling with café theme colors */
.card {
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.card-header {
  font-weight: bold;
  font-size: 1.1em;
  padding: 10px;
}

.bg-coffee-dark {
  background-color: var(--coffee-dark);
}

.bg-coffee-light {
  background-color: var(--coffee-light);
}

/* Text colors */
.text-light {
  color: #f3e5e5; /* Lighter shade for better readability on dark background */
}

.text-brown {
  color: var(--coffee-dark);
}

.order-number {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  color: var(--coffee-dark);
}

.text-muted {
  color: var(--text-muted);
}

.list-group-item.text-muted {
  font-style: italic;
  color: var(--text-muted);
}

.list-group-item {
  background-color: #fdfaf5;
  border: none;
}
</style>
