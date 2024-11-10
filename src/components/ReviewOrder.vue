<template>
  <div class="review-order">
    <h2>Review My Order</h2>
    <div v-if="cart.length > 0">
      <div v-for="item in cart" :key="item.uniqueId" class="order-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-details">
          <div class="item-header">
            <h3 class="item-name">{{ item.name }}</h3>
            <button @click="removeItem(item.uniqueId)" class="remove-btn">Remove</button>
          </div>
          <p class="item-price">₱ {{ item.price.toFixed(2) }}</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
          </div>
          <textarea
            v-model="item.instructions"
            class="special-instructions"
            placeholder="Special instructions (e.g., no onions, extra spicy)"
          ></textarea>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3 class="total-text">Total: ₱ {{ total.toFixed(2) }}</h3>
        <div class="buttons-container">
          <button @click="goBack" class="back-btn">Add More Items</button>
          <button @click="proceedToCheckout" class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>

      <!-- Suggested Items for Upselling -->
      <div class="suggested-items">
        <h3>Suggested Items</h3>
        <div v-for="suggestion in suggestedItems" :key="suggestion.id" class="suggested-item">
          <img :src="suggestion.image" :alt="suggestion.name" class="suggested-image" />
          <div class="suggestion-details">
            <h4>{{ suggestion.name }}</h4>
            <p>₱ {{ suggestion.price.toFixed(2) }}</p>
            <button @click="addSuggestedItem(suggestion)" class="add-suggestion-btn">Add to Order</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="empty-cart-message">Your cart is empty. Please add items to your order.</p>
      <button @click="goBackToMainMenu" class="back-to-main-btn">Back to Main Menu</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewOrder',
  data() {
    return {
      cart: [],
      suggestedItems: []
    };
  },
  computed: {
    total() {
      // Sum up the totalPrice of each item in the cart
      return this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    }
  },
  created() {
    this.loadCart();
    this.generateSuggestedItems();
  },
  methods: {
    loadCart() {
      const storedCart = localStorage.getItem('cart');
      this.cart = storedCart ? JSON.parse(storedCart) : [];
      this.updateTotalPrices();
    },
    increaseQuantity(item) {
      item.quantity += 1;
      item.totalPrice = item.price * item.quantity; // Calculate the new total price based on quantity
      this.saveCart();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity; // Calculate the new total price based on quantity
        this.saveCart();
      }
    },
    updateTotalPrices() {
      // Recalculate total prices for all items in case quantities were changed
      this.cart.forEach(item => {
        item.totalPrice = item.price * item.quantity;
      });
    },
    removeItem(uniqueId) {
      this.cart = this.cart.filter(item => item.uniqueId !== uniqueId);
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    goBack() {
      this.$router.push('/main-menu');
    },
    goBackToMainMenu() {
      this.$router.push('/main-menu');
    },
    proceedToCheckout() {
      // Save the current state of the cart in localStorage and proceed to checkout
      const updatedCart = this.cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
        instructions: item.instructions || "",
        uniqueId: item.uniqueId // Make sure to store uniqueId
      }));

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      this.$router.push('/payment-options');
    },
    generateSuggestedItems() {
      const popularItems = [
        { id: 9, name: 'Parmesan Chicken', category: 'Chicken', price: 129, image: require('@/assets/parmesan.png') },
        { id: 10, name: 'Sweet Chilli Chicken', category: 'Chicken', price: 129, image: require('@/assets/sweetchilli.png') },
        { id: 11, name: 'Buffalo Chicken', category: 'Chicken', price: 129, image: require('@/assets/buffalo.png') },
        { id: 12, name: 'Classic Chicken', category: 'Chicken', price: 129, image: require('@/assets/classic.png') }
      ];

      this.suggestedItems = popularItems.filter(item => {
        return !this.cart.some(cartItem => cartItem.id === item.id);
      });
    },
    addSuggestedItem(suggestion) {
      // Create a new item object with a truly unique identifier
      const newItem = {
        ...JSON.parse(JSON.stringify(suggestion)), // Deep clone to avoid reference issues
        quantity: 1,
        totalPrice: suggestion.price,
        uniqueId: Date.now() + Math.random() // Truly unique identifier
      };

      // Push the new item to the cart
      this.cart.push(newItem);

      // Save to localStorage
      this.saveCart();

      // Debug logs to verify
      console.log("New item added:", newItem);
      console.log("Cart after adding:", JSON.parse(JSON.stringify(this.cart)));
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
.review-order {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
}

h2 {
  text-align: center;
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
  border: 1px solid #ddd;
}

.item-details {
  flex-grow: 1;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.item-name {
  margin-right: 20px;
}

.item-price {
  font-size: 1em;
  color: #888;
  margin-top: 5px;
  margin-bottom: 15px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.quantity-btn {
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0 5px;
}

.quantity {
  font-size: 1.1em;
  color: #333;
  font-weight: bold;
}

.special-instructions {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  font-size: 0.8em;
  border-radius: 4px;
  border: 1px solid #ddd;
  resize: vertical;
  min-height: 50px;
}

.remove-btn {
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c9302c;
}

.order-summary {
  margin-top: 20px;
  padding-top: 15px;
  text-align: center;
  border-top: 2px solid #ddd;
}

.total-text {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 15px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

.back-btn {
  background-color: #5bc0de;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #31b0d5;
}

.checkout-btn {
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #4cae4c;
}

.empty-cart-message {
  text-align: center;
  font-size: 0.9em;
  color: #777;
  margin-top: 30px;
}

.back-to-main-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: rgba(79, 53, 38, 1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  text-align: center;
  transition: background-color 0.3s;
}

.back-to-main-btn:hover {
  background-color: rgba(79, 53, 38, 0.8);
}

.suggested-items {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #ddd;
}

.suggested-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 1em;
}

.suggested-image {
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 8px;
}

.suggestion-details {
  flex-grow: 1;
}

.suggestion-details h4 {
  font-size: 1em;
  margin: 0;
  color: #333;
}

.suggestion-details p {
  font-size: 0.9em;
  margin: 2px 0;
  color: #666;
}

.add-suggestion-btn {
  background-color: #ffcc00;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 0.9em;
  cursor: pointer;
}
</style>
