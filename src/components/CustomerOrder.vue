<template>
  <div class="container admin-page">
    <!-- Section to View Orders -->
    <section class="orders-section mb-5">
      <div v-if="orders.length > 0" class="table-responsive">
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
                <div class="btn-group" role="group" aria-label="Order actions">
                  <button class="btn btn-warning btn-sm action-btn" @click="updateOrderState(order.id, 'Preparing')">
                    PREPARING
                  </button>
                  <button class="btn btn-success btn-sm action-btn" @click="updateOrderState(order.id, 'Ready')">
                    READY
                  </button>
                  <button class="btn btn-danger btn-sm action-btn" @click="updateOrderState(order.id, 'Cancelled')">
                    CANCEL
                  </button>
                  <button class="btn btn-secondary btn-sm action-btn" @click="updateOrderState(order.id, 'Delivered')">
                    DELIVER
                  </button>
                  <button class="btn btn-outline-danger btn-sm action-btn" @click="deleteOrder(order.id)">
                    DELETE
                  </button>
                  <button class="btn btn-primary btn-sm action-btn" @click="generateReceipt(order)">
                    RECEIPT
                  </button>
                </div>
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
    fetchOrders() {
      const ordersCollection = collection(db, "orders");
      onSnapshot(
        ordersCollection,
        (snapshot) => {
          this.orders = snapshot.docs.map((doc) => ({
            id: doc.id,
            orderNumber: doc.data().orderNumber || doc.id,
            ...doc.data()
          }));
        },
        (error) => {
          console.error("Error fetching orders:", error);
          alert("There was an error fetching orders.");
        }
      );
    },
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
    },
    generateReceipt(order) {
      const receiptContent = `
        <html>
        <head>
          <title>Receipt</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;700&display=swap');
            body { font-family: 'Merriweather', serif; padding: 20px; color: #4e342e; }
            h1 { text-align: center; color: #6d4c41; }
            .receipt-container { max-width: 300px; margin: auto; padding: 20px; border: 2px dashed #d7ccc8; background-color: #f5f5f5; border-radius: 10px; }
            .receipt-info { margin-bottom: 20px; }
            .items-table { width: 100%; margin-bottom: 20px; border-collapse: collapse; }
            .items-table th, .items-table td { padding: 8px; text-align: left; }
            .items-table th { background-color: #d7ccc8; color: #4e342e; }
            .total { font-size: 1.2em; font-weight: bold; text-align: right; margin-top: 15px; color: #4e342e; }
            .footer { text-align: center; font-size: 0.9em; color: #6d4c41; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <h1>Chillax Cafe</h1>
            <div class="receipt-info">
              <p><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Type:</strong> ${order.orderMode || 'N/A'}</p>
              <p><strong>Payment:</strong> ${order.paymentMethod || 'N/A'}</p>
            </div>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items
                  .map(
                    (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>₱${item.price.toFixed(2)}</td>
                      <td>${item.quantity}</td>
                      <td>₱${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `
                  )
                  .join('')}
              </tbody>
            </table>
            <div class="total">Total: ₱${order.total.toFixed(2)}</div>
            <div class="footer">Thank you for dining with us!</div>
          </div>
        </body>
        </html>
      `;

      const printWindow = window.open('', '', 'width=600,height=400');
      printWindow.document.write(receiptContent);
      printWindow.document.close();
      printWindow.print();
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.orders-section {
  overflow-x: auto;
}

.orders-section table {
  width: 100%;
  font-size: 0.9rem;
  border-collapse: collapse;
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

/* Action buttons adjustments */
.btn-group .action-btn {
  padding: 4px 8px;
  font-size: 0.85rem;
  margin-right: 3px;
}

@media (max-width: 768px) {
  .orders-section table {
    font-size: 0.8rem;
  }

  .btn-group .action-btn {
    padding: 4px 6px;
    font-size: 0.75rem;
  }
}

@media (max-width: 576px) {
  .orders-section table {
    font-size: 0.75rem;
  }

  .badge-success, .badge-warning, .badge-danger, .badge-secondary, .badge-info {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
}
</style>
