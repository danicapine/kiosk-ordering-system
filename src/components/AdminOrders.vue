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
              <th>Price (₱)</th>
              <th>Quantity</th>
              <th>Items</th>
              <th>Type</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <td>{{ order.orderNumber }}</td>
              <td>{{ order.total ? order.total.toFixed(2) : 'N/A' }}</td>
              <td>{{ order.items.length }}</td>
              <td>
                <ul class="list-unstyled mb-0">
                  <li v-for="item in order.items" :key="item.name">
                    <strong>{{ item.name }}</strong> x {{ item.quantity }}
                    <p v-if="item.instructions" class="text-muted">Instructions: {{ item.instructions }}</p>
                  </li>
                </ul>
              </td>
              <td>{{ order.orderMode || 'N/A' }}</td>
              <td>{{ order.paymentMethod || 'N/A' }}</td>
              <td>
                <span :class="getStateClass(order.status)">{{ order.status }}</span>
              </td>
              <td>
                <button
                  class="btn btn-warning btn-sm mr-1"
                  @click="updateOrderState(order.id, 'Preparing')"
                >
                  PREPARING
                </button>
                <button
                  class="btn btn-success btn-sm mr-1"
                  @click="updateOrderState(order.id, 'Ready')"
                >
                  READY
                </button>
                <button
                  class="btn btn-danger btn-sm mr-1"
                  @click="updateOrderState(order.id, 'Cancelled')"
                >
                  CANCEL
                </button>
                <button
                  class="btn btn-secondary btn-sm mr-1"
                  @click="updateOrderState(order.id, 'Delivered')"
                >
                  DELIVER
                </button>
                <button
                  class="btn btn-outline-danger btn-sm delete-btn"
                  @click="deleteOrder(order.id)"
                >
                  DELETE
                </button>
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
import { collection, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";

export default {
  name: "AdminPage",
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.fetchOrders(); // Set up real-time updates for orders
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
      }, (error) => {
        console.error("Error fetching orders:", error);
        alert("There was an error fetching orders.");
      });
    },

    // Update Order State
    async updateOrderState(orderId, newState) {
      try {
        const orderDoc = doc(db, "orders", orderId);
        await updateDoc(orderDoc, { status: newState });
        console.log(`Order status updated to ${newState}`);
      } catch (error) {
        console.error("Error updating order status:", error);
        alert("There was an error updating the order status.");
      }
    },

    // Delete Order
    async deleteOrder(orderId) {
      if (confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
        try {
          await deleteDoc(doc(db, "orders", orderId));
          console.log("Order deleted successfully.");
        } catch (error) {
          console.error("Error deleting order:", error);
          alert("There was an error deleting the order.");
        }
      }
    },

    // Get State Class for styling
    getStateClass(status) {
      switch (status) {
        case "Ready":
          return "badge badge-success";
        case "Queued":
          return "badge badge-info";
        case "Preparing":
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

.badge-info {
  background-color: #17a2b8;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

/* Add spacing to the DELETE button */
.delete-btn {
  margin-left: 5px; /* Add space between "Deliver" and "Delete" */
}
</style>
