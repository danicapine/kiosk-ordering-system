<template>
  <div class="payment-options-container">
    <div class="payment-options">
      <h2>How would you like to pay?</h2>
      <div class="options">
        <button @click="selectPayment('G-Cash')" class="option-btn">
          <img src="@/assets/cashless.png" alt="Cashless Payment" />
          <p>Pay Here (Cashless)</p>
        </button>
        <p class="divider">Or</p>
        <button @click="selectPayment('Cash')" class="option-btn">
          <img src="@/assets/cash.png" alt="Cash Payment" />
          <p>Pay at the Counter (Cash)</p>
        </button>
      </div>
      <button @click="goBack" class="back-btn">Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentOptions",
  data() {
    return {
      selectedPaymentMethod: null,
    };
  },
  methods: {
    selectPayment(paymentMethod) {
      this.selectedPaymentMethod = paymentMethod;
      this.$router.push({ name: "OrderModeOptions", query: { paymentMethod } });
    },
    goBack() {
      this.$router.push("/review-order");
    },
  },
};
</script>

<style scoped>
.payment-options-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: white;
  padding: 1rem;
}

.payment-options {
  text-align: center;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: #f5e6d3;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(78, 52, 46, 0.1);
}

h2 {
  font-size: 2rem;
  color: #4e342e;
  margin-bottom: 2.5rem;
  font-weight: 600;
}

.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.option-btn {
  background-color: white;
  border: 1px solid #e2d5c7;
  border-radius: 0.75rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-btn:hover {
  border-color: #4e342e;
  background-color: #faf6f3;
}

.option-btn img {
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
}

.option-btn p {
  font-size: 1.25rem;
  color: #4e342e;
  margin: 0;
}

.divider {
  font-size: 1rem;
  color: #8b7e74;
  margin: 0.5rem 0;
}

.back-btn {
  margin-top: 2.5rem;
  padding: 0.75rem 2.5rem;
  background-color: #8b5e3c;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 1rem;
  font-weight: 500;
}

.back-btn:hover {
  background-color: #5a3d37;
}

@media (max-width: 640px) {
  .payment-options {
    padding: 1.5rem;
    margin: 1rem;
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 2rem;
  }

  .option-btn {
    padding: 1.25rem;
  }
}
</style>