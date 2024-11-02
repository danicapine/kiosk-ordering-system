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
  export default {
    name: "OrderModeOptions",
    methods: {
      selectOrderMode(orderMode) {
        if (orderMode === 'table') {
          // Handle table service option (you may navigate to a specific page or handle logic here)
          this.$router.push('/table-service');
        } else if (orderMode === 'counter') {
          // Handle counter pickup option
          this.$router.push('/counter-pickup');
        }
      },
      goBack() {
        this.$router.push('/payment-options');
      }
    }
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
  