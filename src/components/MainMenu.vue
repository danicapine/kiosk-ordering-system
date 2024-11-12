<template>
  <div class="main-menu">
    <!-- Sidebar Navigation -->
    <div class="sidebar">
      <div class="logo-container">
        <img src="@/assets/apple-touch-icon.png" alt="Logo" class="logo-image" />
      </div>

      <!-- Category Icons -->
      <div
        v-for="category in categories"
        :key="category.name"
        @click="filterByCategory(category.name)"
        :class="{ active: selectedCategory === category.name }"
        class="sidebar-item"
      >
        <img :src="category.image" :alt="category.name" class="sidebar-image" />
      </div>
    </div>

    <!-- Main Menu Content -->
    <div class="menu-content">
      <!-- Search Bar -->
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for items..."
          class="search-input"
          @input="filterFoods"
        />
      </div>

      <!-- Food Items Grid -->
      <div class="food-items">
        <div 
          v-for="food in filteredFoods" 
          :key="food.id" 
          class="food-item"
          @click="openFoodModal(food)"
        >
          <img :src="food.image" :alt="food.name" class="food-image" />
          <div class="food-details">
            <span class="food-name">{{ food.name }}</span>
            <div class="food-price-container">
              <span class="food-price">₱ {{ food.price.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Food Details Modal -->
    <div v-if="selectedFood" class="food-modal-overlay">
      <div class="food-modal">
        <h2 class="food-modal-title">{{ selectedFood.name }}</h2>
        <div class="food-modal-content">
          <div class="image-container">
            <img :src="selectedFood.image" :alt="selectedFood.name" class="modal-food-image" />
          </div>
          <div class="modal-quantity">
            <button @click="decreaseQuantity" class="quantity-btn">-</button>
            <span class="quantity">{{ quantity }}</span>
            <button @click="increaseQuantity" class="quantity-btn">+</button>
          </div>
          <div class="modal-actions">
          <span class="food-price large-price">₱ {{ (selectedFood.price * quantity).toFixed(2) }}</span>
          <button class="add-to-order-btn" @click="addToOrder">Add to Order</button>
        </div>
        </div>
        <button class="cancel-btn" @click="closeFoodModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export default {
  name: 'MainMenu',
  data() {
    return {
      categories: [
        { name: 'All', image: require('@/assets/all.png') },
        { name: 'Rice', image: require('@/assets/ricemeal.png') },
        { name: 'Chicken', image: require('@/assets/flavored.png') },
        { name: 'Burgers', image: require('@/assets/burgers.png') },
        { name: 'Pasta', image: require('@/assets/pasta.png') },
      ],
      selectedCategory: 'All',
      foods: [],
      filteredFoods: [],
      selectedFood: null,
      quantity: 1,
      searchQuery: ''
    };
  },
  created() {
    this.fetchMenuItems();
  },
  methods: {
    fetchMenuItems() {
      const menuRef = collection(db, "menu");
      onSnapshot(menuRef, (snapshot) => {
        this.foods = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((food) => food.isAvailable); // Only show available items
        this.filterFoods(); // Update the displayed items based on current filters
      });
    },
    filterByCategory(category) {
      this.selectedCategory = category;
      this.filterFoods();
    },
    filterFoods() {
  const query = this.searchQuery ? this.searchQuery.toLowerCase() : ''; // Ensure searchQuery is a string
  this.filteredFoods = this.foods.filter(food => {
    const matchesCategory = this.selectedCategory === 'All' || food.category === this.selectedCategory;
    const matchesSearch = food.name && food.name.toLowerCase().startsWith(query); // Check if food.name starts with query
    return matchesCategory && matchesSearch;
  });
},
    openFoodModal(food) {
      this.selectedFood = food;
      this.quantity = 1;
    },
    closeFoodModal() {
      this.selectedFood = null;
    },
    increaseQuantity() {
      this.quantity += 1;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity -= 1;
    },
    addToOrder() {
      if (this.selectedFood) {
        const orderItem = {
          id: this.selectedFood.id,
          name: this.selectedFood.name,
          price: this.selectedFood.price,
          quantity: this.quantity,
          totalPrice: this.selectedFood.price * this.quantity,
          image: this.selectedFood.image
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItemIndex = cart.findIndex(item => item.id === orderItem.id);

        if (existingItemIndex !== -1) {
          cart[existingItemIndex].quantity += orderItem.quantity;
          cart[existingItemIndex].totalPrice += orderItem.totalPrice;
        } else {
          cart.push(orderItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        this.closeFoodModal();
        this.$router.push('/review-order'); // Redirect to Review Order page
      }
    }
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.main-menu {
  display: flex;
  min-height: 100vh;
  color: rgba(79, 53, 38, 1);
  font-size: x-large;
  background-image: url('@/assets/bg.png'); /* Path to your background image */
  background-size: cover;
  background-position: center;
  padding-left: 90px; /* Add padding to offset sidebar width */
  position: relative;
}

.sidebar {
  width: 95px;
  background-color: rgba(75, 50, 37, 0.9); /* Dark brown with slight opacity */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; /* Reduced padding */
  border-radius: 12px 0 0 12px; /* Rounded corners */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3); /* Shadow for depth */
  position: fixed; /* Fixed positioning for better alignment */
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1; /* Ensures it sits behind other main content */
}

.logo-container {
  margin-bottom: 15px; /* Slightly smaller margin */
  text-align: center;
  background-color: whitesmoke;/* Light background for visibility */
  padding: 5px; /* Padding around the logo */
  border-radius: 8px; /* Rounded corners */
}

.logo-image {
  width: 70px; /* Adjusted size */
  height: 70px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for visibility */
}

.sidebar-item {
  margin: 15px 0;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s, width 0.3s, height 0.3s;
}

.sidebar-item:hover {
  background-color: rgba(255, 204, 0, 0.3); /* Subtle highlight on hover */
}

.sidebar-item.active {
  background-color: rgba(255, 204, 0, 0.8); /* Brighter background for active category */
  border: 3px solid #ffcc00; /* Thicker golden border */
  width: 70px; /* Increase width */
  height: 70px; /* Increase height */
  transform: scale(1.1); /* Slightly larger to indicate active state */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3); /* Stronger shadow for emphasis */
}

.sidebar-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
  transition: transform 0.3s ease; /* Smooth transition for scaling */
}

.sidebar-item:hover .sidebar-image,
.sidebar-item.active .sidebar-image {
  transform: scale(1.2); /* Enlarge image on hover and active state */
}
.menu-content {
  flex-grow: 1;
  padding: 20px;
  border-radius: 8px;
  z-index: 2; /* Ensure it sits above the sidebar */
}

.search-bar {
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 2px solid #ffffff; /* White border for visibility */
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.2); /* Light white background for better contrast */
  color: #ffffff; /* White text color */
  outline: none; /* Remove the default outline */
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7); /* Light white color for placeholder text */
}

.food-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  justify-items: center;
}

.food-item {
  background-color: rgba(75, 50, 37, 0.8); /* Brown with 80% opacity */
  border: 1px solid rgba(79, 53, 38, 0.5); /* Light brown border with transparency */
  border-radius: 12px;
  width: 250px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.food-item:hover {
  transform: scale(1.03);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.food-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.food-details {
  margin-top: 10px;
}

.food-name {
  font-weight: 600;
  font-size: 1.1em;
  color: #fff; /* White text for contrast */
  margin-bottom: 8px;
}

.food-price-container {
  margin-top: 5px;
}

.food-price {
  font-weight: bold;
  color: #d4af37; /* Gold color for price */
}
.food-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* High z-index to ensure it stays on top */
}

.food-modal {
  background-color: whitesmoke;
  padding: 40px; /* Increased padding for a larger appearance */
  border-radius: 12px;
  width: 350px; /* Increased width */
  max-width: 90%; /* Ensures responsiveness on smaller screens */
  height: auto; /* Let the content define the height */
  text-align: center;
  z-index: 10000; /* Even higher to ensure it appears above the overlay */
}

.food-modal {
  background-color:whitesmoke;
  padding: 40px; /* Increased padding for a larger appearance */
  border-radius: 12px;
  width: 350px; /* Increased width */
  max-width: 90%; /* Ensures responsiveness on smaller screens */
  height: auto; /* Let the content define the height */
  text-align: center;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
  height: 200px;
}

.modal-food-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.modal-quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.quantity-btn {
  width: 50px;
  height: 50px;
  font-size: 1.2em;
  background-color: #ffcc00;
  border: none;
  cursor: pointer;
  margin: 0 5px;
}

.quantity {
  font-size: 1.2em;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-to-order-btn,
.cancel-btn {
  width: 100%; /* Full width to match the image container */
  padding: 12px 0; /* Increased padding for height */
  border: none;
  border-radius: 6px; /* Slightly rounded corners */
  cursor: pointer;
  font-size: 1.1em; /* Larger font size for readability */
  margin-top: 15px; /* More space above */
  text-align: center;
}

.add-to-order-btn {
  background-color: green;
  color:white;
}

.cancel-btn {
  background-color: red;
  color: white;
}
.large-price {
  font-size: 1.5em; /* Adjust this value to make it larger */
  font-weight: bold;
  color: #d4af37; /* Gold color for visibility */
  margin-bottom: 10px; /* Add some space below the price if needed */
}

</style>
