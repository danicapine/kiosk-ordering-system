<template>
    <div class="confirmation-screen">
      <h2>Your Order</h2>
      <p>Order Number: {{ $route.params.orderNumber }}</p>
      <p>Please proceed to the counter with your order number.</p>
      <button @click="goHome" class="back-btn">Home</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ConfirmationScreen",
    methods: {
      goHome() {
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style scoped>
  .confirmation-screen {
    text-align: center;
    padding: 20px;
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
  