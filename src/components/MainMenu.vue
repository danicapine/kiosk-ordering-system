<template>
    <div class="main-menu">
      <div class="overlay"></div>
      <div class="content">
        <h1 class="title">Welcome to the Kiosk Ordering System</h1>
  
        <div class="menu-container">
          <!-- Category Filter -->
          <div class="category-filter">
            <h2>Categories</h2>
            <select v-model="selectedCategory" @change="filterFoods" id="category">
              <option value="all">All</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>
          </div>
  
          <!-- Search Filter -->
          <div class="search-filter">
            <label for="search">Search Foods:</label>
            <input type="text" v-model="searchQuery" @input="filterFoods" id="search" placeholder="Type to search..." />
          </div>
  
          <!-- Food Items List -->
          <div class="food-items">
            <div v-for="food in filteredFoods" :key="food.id" class="food-item">
              <img :src="food.image" :alt="food.name" class="food-image" />
              <span class="food-name">{{ food.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainMenu',
    data() {
      return {
        selectedCategory: 'all',
        searchQuery: '',
        categories: ['Burgers', 'Pizzas', 'Salads', 'Desserts'], // Add more categories as needed
        foods: [
          { id: 1, name: 'Cheeseburger', category: 'Burgers', image: require('@/assets/cheeseburger.jpg') },
          { id: 2, name: 'Pepperoni Pizza', category: 'Pizzas', image: require('@/assets/pepperoni-pizza.jpg') },
          { id: 3, name: 'Caesar Salad', category: 'Salads', image: require('@/assets/caesar-salad.jpg') },
          { id: 4, name: 'Chocolate Cake', category: 'Desserts', image: require('@/assets/chocolate-cake.jpg') },
          // Add more food items as needed
        ],
        filteredFoods: [],
      };
    },
    created() {
      this.filteredFoods = this.foods; // Initialize with all foods
    },
    methods: {
      filterFoods() {
        this.filteredFoods = this.foods.filter(food => {
          const matchesCategory = this.selectedCategory === 'all' || food.category === this.selectedCategory;
          const matchesSearch = food.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .main-menu {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-image: url('c:/Users/ADMIN/Downloads/1.png'); /* Change to your preferred background */
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    padding: 20px;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1; /* Keep overlay behind content */
  }
  
  .content {
    z-index: 2; /* Keep content above overlay */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1; /* Allow the content to grow and occupy space */
    padding: 20px; /* Add padding for better spacing */
  }
  
  .menu-container {
    display: flex;
    width: 100%;
    max-width: 1200px; /* Limit width for better layout */
  }
  
  .category-filter {
    flex: 1;
    margin-right: 20px; /* Space between category filter and food items */
  }
  
  .search-filter {
    margin: 20px 0; /* Space around the search filter */
  }
  
  .title {
    font-family: 'Playfair Display', serif;
    font-size: 6vw; /* Responsive font size */
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .food-items {
    flex: 3;
    display: flex;
    flex-wrap: wrap; /* Allow food items to wrap */
    justify-content: center; /* Center the items */
    gap: 20px; /* Space between food items */
  }
  
  .food-item {
    text-align: center;
  }
  
  .food-image {
    width: 150px; /* Set a fixed size for images */
    height: auto; /* Maintain aspect ratio */
    border-radius: 8px;
  }
  
  .food-name {
    margin-top: 10px; /* Space between image and text */
    font-size: 1.2vw; /* Responsive font size */
  }
  
  /* Media queries for responsiveness */
  @media (max-width: 768px) {
    .title {
      font-size: 4vw; /* Adjusted for mobile */
    }
    .food-name {
      font-size: 3.5vw; /* Adjusted for mobile */
    }
  }
  
  @media (max-width: 480px) {
    .title {
      font-size: 3.5vw; /* Adjusted for smaller screens */
    }
    .food-name {
      font-size: 3vw; /* Adjusted for smaller screens */
    }
  }
  </style>
  