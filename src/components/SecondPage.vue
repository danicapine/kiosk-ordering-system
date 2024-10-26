<template>
    <div class="second-page">
      <h1>Where will you be eating today?</h1>
      <div class="options">
        <button @click="selectOption('dine-in')">Dine In</button>
        <button @click="selectOption('take-out')">Take Out</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SecondPage',
    methods: {
      selectOption(option) {
        console.log(`You selected: ${option}`); // Handle option selection here
        // You can add further logic, like navigating to another page or showing a message
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles as needed */
  .second-page {
    text-align: center;
    padding: 20px;
  }
  
  .options {
    margin-top: 20px;
  }
  
  .options button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>
  