<template>
  <div class="order-mode-options-container">
    <div class="order-mode-options">
      <h2>How would you like to get your order?</h2>
      <div class="options">
        <button @click="selectOrderMode('table')" class="option-btn">
          <img src="@/assets/served-at-table.png" alt="Served at your table" />
          <p>Served at your table</p>
        </button>
        <button @click="selectOrderMode('counter')" class="option-btn">
          <img src="@/assets/pick-up-counter.png" alt="Pick up at counter" />
          <p>Pick up at counter</p>
        </button>
      </div>
      <button @click="goBack" class="back-btn">Back</button>
    </div>
  </div>
</template>

<script>
import { db } from "@/config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default {
  name: "OrderModeOptions",
  methods: {
    async selectOrderMode(orderMode) {
      // Retrieve payment method from query parameters
      const paymentMethod = this.$route.query.paymentMethod || "Cash";

      // Generate a unique order number
      const orderNumber = "ORD-" + Math.floor(1000 + Math.random() * 9000);

      // Retrieve items from cart in local storage
      const items = JSON.parse(localStorage.getItem("cart")) || [];

      // Calculate total price
      const total = this.calculateTotal(items);

      // Prepare order data
      const orderData = {
        orderNumber,
        items, // items now includes instructions
        paymentMethod,
        orderMode,
        status: "queued",
        createdAt: serverTimestamp(),
        total,
      };

      try {
        // Step 1: Save order to the `orders` collection
        await addDoc(collection(db, "orders"), orderData);

        // Step 2: Save only the total to the `sales` collection for aggregation
        await addDoc(collection(db, "sales"), {
          saleDate: serverTimestamp(),
          total,
        });

        // Navigate to the confirmation screen with the order number
        if (this.$route.name !== "ConfirmationScreen") {
          this.$router.push({ name: "ConfirmationScreen", params: { orderNumber } });
        }
      } catch (error) {
        console.error("Error saving order to Firestore:", error);
        alert("Failed to save order. Please try again.");
      }
    },
    goBack() {
      this.$router.push("/payment-options");
    },
    calculateTotal(items) {
      return items.reduce((acc, item) => acc + item.totalPrice, 0);
    },
  },
};
</script>

<style scoped>
.order-mode-options-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.order-mode-options {
  text-align: center;
  max-width: 600px;
  padding: 30px;
  background-color:  #f5e6d3;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2em;
  color: #4e342e;
  margin-bottom: 25px;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.option-btn {
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 45%;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.option-btn img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.option-btn p {
  font-size: 1.2em;
  color: #4e342e;
}

.option-btn:hover {
  border-color: #4e342e;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #8b5e3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #8b5e3c;
}
</style>
