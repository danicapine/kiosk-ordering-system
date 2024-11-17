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
        <span class="category-icon">{{ category.icon }}</span>
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
        { name: 'All', icon: 'ALL' },
        { name: 'Rice', icon: 'RICE' },
        { name: 'Chicken', icon: 'CHKN' },
        { name: 'Burgers', icon: 'BRGR' },
        { name: 'Pasta', icon: 'PSTA' },
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
          .filter((food) => food.isAvailable);
        this.filterFoods();
      });
    },
    filterByCategory(category) {
      this.selectedCategory = category;
      this.filterFoods();
    },
    filterFoods() {
      const query = this.searchQuery ? this.searchQuery.toLowerCase() : '';
      this.filteredFoods = this.foods.filter(food => {
        const matchesCategory = this.selectedCategory === 'All' || food.category === this.selectedCategory;
        const matchesSearch = food.name && food.name.toLowerCase().startsWith(query);
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
        this.$router.push('/review-order');
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
  font-family: 'Arial', sans-serif;
}

.main-menu {
  display: flex;
  min-height: 100vh;
  color: #6D4C41;
  font-size: 16px;
  background-color: #F5F5DC;
  padding-left: 100px;
  position: relative;
}

.sidebar {
  width: 100px;
  background-color: rgba(139, 69, 19, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  border-radius: 0 20px 20px 0;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  transition: width 0.3s ease;
}

.sidebar:hover {
  width: 120px;
}

.logo-container {
  margin-bottom: 30px;
  text-align: center;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.logo-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.logo-container:hover .logo-image {
  transform: scale(1.1);
}

.sidebar-item {
  margin: 15px 0;
  cursor: pointer;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}

.sidebar-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, #D2B48C(255,204,0,0.2) 0%, #D2B48C(255,204,0,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar-item:hover::before,
.sidebar-item.active::before {
  opacity: 1;
}

.sidebar-item.active {
  background-color: rgba(255, 204, 0, 0.2);
  box-shadow: 0 4px 15px rgba(255, 204, 0, 0.3);
  transform: translateY(-5px);
}

.sidebar-item:hover,
.sidebar-item.active {
  color: #ffcc00;
}

.menu-content {
  flex-grow: 1;
  padding: 40px;
  border-radius: 20px;
  z-index: 2;
  background-color: rgba(245, 245, 220, 0.9);
  margin: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.search-bar {
  margin-bottom: 30px;
}

.search-input {
  width: 100%;
  padding: 15px 20px;
  font-size: 1.1em;
  border: none;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #4a3c31;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 20px rgba(255, 204, 0, 0.3);
}

.search-input::placeholder {
  color: #a0918c;
}

.food-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  justify-items: center;
}

.food-item {
  background-color: #FFF8DC;
  border-radius: 20px;
  width: 280px;
  height: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.food-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.food-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.food-item:hover .food-image {
  transform: scale(1.05);
}

.food-details {
  margin-top: 15px;
}

.food-name {
  font-weight: 600;
  font-size: 1.2em;
  color: #6D4C41;
  margin-bottom: 10px;
}

.food-price-container {
  margin-top: 10px;
}

.food-price {
  font-weight: bold;
  color: #8B4513;
  font-size: 1.3em;
}

.food-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.food-modal {
  background-color: #F5F5DC;
  padding: 40px;
  border-radius: 25px;
  width: 400px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.food-modal-title {
  font-size: 1.8em;
  color: #6D4C41;
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-radius: 15px;
}

.modal-food-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover .modal-food-image {
  transform: scale(1.05);
}

.modal-quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  font-size: 1.2em;
  background-color: #8B4513;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 10px;
  color: #F5F5DC;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background-color: #A0522D;
  transform: scale(1.1);
}

.quantity {
  font-size: 1.4em;
  font-weight: bold;
  color: #6D4C41;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.large-price {
  font-size: 1.8em;
  font-weight: bold;
  color: #8B4513;
  margin-bottom: 20px;
}

.add-to-order-btn,
.cancel-btn {
  width: 100%;
  padding: 15px 0;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.add-to-order-btn {
  background-color: #8B4513;
  color: #F5F5DC;
  margin-bottom: 10px;
}

.add-to-order-btn:hover {
  background-color: #A0522D;
  box-shadow: 0 5px 15px rgba(139, 69, 19, 0.4);
}

.cancel-btn {
  background-color: #D2B48C;
  color: #6D4C41;
}

.cancel-btn:hover {
  background-color: #DEB887;
  box-shadow: 0 5px 15px rgba(210, 180, 140, 0.4);
}

.category-icon {
  font-size: 18px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .main-menu {
    padding-left: 80px;
  }

  .sidebar {
    width: 80px;
  }

  .food-items {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  .food-item {
    width: 220px;
    height: 320px;
  }

  .food-image {
    height: 180px;
  }

  .food-modal {
    width: 90%;
    padding: 30px;
  }
}
</style>