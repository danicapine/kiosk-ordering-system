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
            <span class="food-price">₱ {{ (selectedFood.price * quantity).toFixed(2) }}</span>
            <button class="add-to-order-btn" @click="addToOrder">Add to Order</button>
          </div>
        </div>
        <button class="cancel-btn" @click="closeFoodModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      categories: [
        { name: 'All', image: require('@/assets/all.png') },
        { name: 'Rice', image: require('@/assets/rice.png') },
        { name: 'Chicken', image: require('@/assets/chicken.png') },
        { name: 'Burgers', image: require('@/assets/burgers.png') },
        { name: 'Pasta', image: require('@/assets/pasta.png') },
      ],
      selectedCategory: 'All',
      foods: [
        { id: 1, name: 'Crispy Chicken', category: 'Rice', price: 149, image: require('@/assets/crispy.png') },
        { id: 2, name: 'Burger Steak', category: 'Rice', price: 129, image: require('@/assets/burgersteak.png') },
        { id: 3, name: 'Fried Liempo', category: 'Rice', price: 139, image: require('@/assets/friedliempo.png') },
        { id: 4, name: 'Buttered Squid', category: 'Rice', price: 129, image: require('@/assets/buttered.png') },
        { id: 5, name: 'Fried Bangus', category: 'Rice', price: 139, image: require('@/assets/friedbangus.png') },
        { id: 6, name: 'Buffalo Shrimp', category: 'Rice', price: 139, image: require('@/assets/shrimp.png') },
        { id: 7, name: 'Pork Adobo', category: 'Rice', price: 139, image: require('@/assets/adobo.png') },
        { id: 8, name: 'Beef Tapa', category: 'Rice', price: 139, image: require('@/assets/tapa.png') },
        { id: 9, name: 'Parmesan Chicken', category: 'Chicken', price: 129, image: require('@/assets/parmesan.png') },
        { id: 10, name: 'Sweet Chilli Chicken', category: 'Chicken', price: 129, image: require('@/assets/sweetchilli.png') },
        { id: 11, name: 'Buffalo Chicken', category: 'Chicken', price: 129, image: require('@/assets/buffalo.png') },
        { id: 12, name: 'Classic Chicken', category: 'Chicken', price: 129, image: require('@/assets/classic.png') },
      ],
      filteredFoods: [],
      selectedFood: null,
      quantity: 1,
      searchQuery: ''
    };
  },
  created() {
    this.filteredFoods = this.foods;
  },
  methods: {
    filterByCategory(category) {
      this.selectedCategory = category;
      this.selectedFood = null;
      this.filterFoods();
    },
    filterFoods() {
      const query = this.searchQuery.toLowerCase();
      this.filteredFoods = this.foods.filter(food => {
        const matchesCategory = this.selectedCategory === 'All' || food.category === this.selectedCategory;
        const matchesSearch = food.name.toLowerCase().includes(query);
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
/* Same styles as before */
</style>

<style scoped>
.main-menu {
  display: flex;
  height: 100vh;
}

/* Sidebar and Main Menu Content CSS */
.sidebar {
  width: 80px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.logo-container {
  margin-bottom: 10px;
  text-align: center;
}
.logo-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
}
.sidebar-item {
  margin: 10px 0;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: border-color 0.3s;
}
.sidebar-item.active {
  border-color: rgba(79, 53, 38, 0.8);
}
.sidebar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Food Items and Modal CSS */
.menu-content {
  flex-grow: 1;
  padding: 20px;
}
.search-bar {
  margin-bottom: 10px;
}
.search-input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.food-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  justify-items: center;
}
.food-item {
  background-color: white;
  border: 1px solid black;
  border-radius: 8px;
  width: 250px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}
.food-image {
  width: 100%;
  height: 60%;
  object-fit: cover;
  border-radius: 8px;
}
.food-details {
  margin-top: 5px;
}
.food-name {
  font-weight: bold;
}
.food-price-container {
  margin-top: 5px;
}
.food-price {
  color: #888;
}

/* Modal CSS */
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
}
.food-modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
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
  width: 30px;
  height: 30px;
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
.add-to-order-btn {
  padding: 8px 16px;
  background-color: #ffcc00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.cancel-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
