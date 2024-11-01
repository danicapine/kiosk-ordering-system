<template>
  <div class="review-order">
    <h2>Review My Order</h2>
    <div v-if="cart.length > 0">
      <div v-for="item in cart" :key="item.id" class="order-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-price">₱ {{ item.totalPrice.toFixed(2) }}</p>
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
        <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
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
    },
    increaseQuantity(item) {
      item.quantity += 1;
      item.totalPrice = item.price * item.quantity;
      this.saveCart();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.price * item.quantity;
        this.saveCart();
      }
    },
    removeItem(itemId) {
      this.cart = this.cart.filter(item => item.id !== itemId);
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    goBack() {
      this.$router.push('/main-menu');
    },
    proceedToCheckout() {
      this.$router.push('/checkout');
    },

    // Generate Suggested Items based on cart contents
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

    // Add a suggested item to the cart
    addSuggestedItem(suggestion) {
      const existingItemIndex = this.cart.findIndex(item => item.id === suggestion.id);

      if (existingItemIndex !== -1) {
        this.cart[existingItemIndex].quantity += 1;
        this.cart[existingItemIndex].totalPrice += suggestion.price;
      } else {
        this.cart.push({ ...suggestion, quantity: 1, totalPrice: suggestion.price });
      }

      this.saveCart();
    }
  }
};
</script>

<style scoped>
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
  margin-bottom: 25px;
}

.order-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
  border: 1px solid #ddd;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-size: 1.5em;
  color: #333;
  margin: 0;
}

.item-price {
  font-size: 1.2em;
  color: #666;
  margin: 5px 0 15px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity {
  margin: 0 15px;
  font-size: 1.3em;
  color: #333;
}

.quantity-btn {
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-btn:hover {
  background-color: #ec971f;
}

.special-instructions {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ddd;
  resize: vertical;
  min-height: 60px;
}

.remove-btn {
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c9302c;
}

.order-summary {
  margin-top: 30px;
  padding-top: 20px;
  text-align: center;
  border-top: 2px solid #ddd;
}

.total-text {
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
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
  padding: 12px 20px;
  font-size: 1em;
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
  padding: 12px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #4cae4c;
}

.empty-cart-message {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  margin-top: 40px;
}

/* Suggested Items Styling */
.suggested-items {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #ddd;
}

.suggested-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.suggested-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 10px;
}

.suggestion-details {
  flex-grow: 1;
}

.add-suggestion-btn {
  background-color: #ffcc00;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
