<template>
    <div class="payment-options-container">
      <div class="payment-options">
        <h2>How would you like to pay?</h2>
        <div class="options">
          <button @click="selectPayment('cashless')" class="option-btn">
            <img src="@/assets/cashless.png" alt="Cashless Payment" />
            <p>Pay Here (Cashless)</p>
          </button>
          <p>Or</p>
          <button @click="selectPayment('cash')" class="option-btn">
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
    methods: {
        selectPayment(paymentMethod) {
        if (paymentMethod === 'cashless') {
            this.$router.push('/order-mode-options');
        } else if (paymentMethod === 'cash') {
            this.$router.push('/order-mode-options');
        }
        },
      goBack() {
        this.$router.push('/review-order');
      }
    }
  };
  </script>
  
  <style scoped>
  .payment-options-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .payment-options {
    text-align: center;
    max-width: 600px;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 2em;
    color: #333;
    margin-bottom: 25px;
  }
  
  .options {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .option-btn {
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 10px 0;
    width: 100%;
    max-width: 400px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .option-btn img {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  
  .option-btn p {
    font-size: 1.2em;
    color: #333;
  }
  
  .option-btn:hover {
    border-color: #5cb85c;
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
  