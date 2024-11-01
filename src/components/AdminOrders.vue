<template>
  <div class="container admin-page">
    <h1 class="text-center my-4">Admin Dashboard</h1>

    <!-- Section to View Orders -->
    <section class="orders-section mb-5">
      <h2 class="mb-3">Customer Orders</h2>
      <div v-if="orders.length > 0">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Price ($)</th>
              <th>Count</th>
              <th>Items</th>
              <th>Type</th>
              <th>Payment</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <td>{{ order.orderNumber }}</td>
              <td>{{ order.totalPrice.toFixed(2) }}</td>
              <td>{{ order.items.length }}</td>
              <td>
                <ul class="list-unstyled mb-0">
                  <li v-for="item in order.items" :key="item.itemId">
                    {{ item.name }} x {{ item.quantity }}
                  </li>
                </ul>
              </td>
              <td>{{ order.type || 'N/A' }}</td>
              <td>{{ order.payment || 'N/A' }}</td>
              <td>
                <span :class="getStateClass(order.state)">{{ order.state }}</span>
              </td>
              <td>
                <button class="btn btn-success btn-sm mr-1" @click="updateOrderState(order.id, 'Ready')">READY</button>
                <button class="btn btn-danger btn-sm mr-1" @click="updateOrderState(order.id, 'Cancelled')">CANCEL</button>
                <button class="btn btn-secondary btn-sm" @click="updateOrderState(order.id, 'Delivered')">DELIVER</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="alert alert-warning">No active orders.</div>
    </section>
  </div>
</template>

<script>
import { db } from "@/config/firebaseConfig";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

export default {
  name: "AdminPage",
  data() {
    return {
      orders: []
    };
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
          ...doc.data()
        }));
      });
    },

    // Update Order State
    async updateOrderState(orderId, newState) {
      try {
        const orderDoc = doc(db, "orders", orderId);
        await updateDoc(orderDoc, { state: newState });
        alert(`Order updated to ${newState}`);
      } catch (error) {
        console.error("Error updating order state:", error);
      }
    },

    // Get State Class for styling
    getStateClass(state) {
      switch (state) {
        case "Ready":
          return "badge badge-success";
        case "In Progress":
          return "badge badge-warning";
        case "Cancelled":
          return "badge badge-danger";
        case "Delivered":
          return "badge badge-secondary";
        default:
          return "badge badge-info";
      }
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.orders-section table {
  width: 100%;
  font-size: 0.9rem;
}

.badge-success {
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.badge-warning {
  background-color: #ffc107;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.badge-danger {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.badge-secondary {
  background-color: #6c757d;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
