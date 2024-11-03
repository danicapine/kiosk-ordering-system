<template>
  <div class="confirmation-screen">
    <div class="receipt">
      <h2>Your Order</h2>
      <p class="order-number">Order Number: <strong>{{ $route.params.orderNumber }}</strong></p>
      <p class="instructions">Please proceed to the counter with your order number.</p>
      <button @click="goHome" class="back-btn">Home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationScreen",
  methods: {
    goHome() {
      this.clearPreviousTransactions(); // Clear previous transactions before going home
      this.$router.push("/");
    },
    clearPreviousTransactions() {
      // Clear cart data in localStorage and any other relevant data
      localStorage.removeItem("cart");
      console.log("Previous transactions cleared.");
    },
  },
};
</script>

<style scoped>
.confirmation-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.receipt {
  width: 300px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Courier New", Courier, monospace;
  color: #333;
}

.receipt h2 {
  margin-top: 0;
  font-size: 1.5em;
  font-weight: bold;
  border-bottom: 1px dashed #333;
  padding-bottom: 10px;
}

.order-number {
  font-size: 1.2em;
  margin: 20px 0;
}

.instructions {
  margin: 10px 0;
  font-size: 0.9em;
  color: #555;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #5bc0de;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #31b0d5;
}
</style>
