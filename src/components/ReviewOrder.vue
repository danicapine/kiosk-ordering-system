<template>
  <div class="review-order">
    <h2>Review My Order</h2>
    <div v-if="cart.length > 0">
      <div v-for="item in cart" :key="item.uniqueId" class="order-item">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-details">
          <div class="item-header">
            <h3 class="item-name">{{ item.name }}</h3>
            <button @click="removeItem(item.uniqueId)" class="remove-btn">
              <span class="remove-icon">×</span>
            </button>
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
        <div class="suggested-items-grid">
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
    </div>
    <div v-else class="empty-cart">
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
    updateTotalPrices() {
      this.cart.forEach(item => {
        item.totalPrice = item.price * item.quantity;
      });
    },
    removeItem(uniqueId) {
      const itemIndex = this.cart.findIndex(item => item.uniqueId === uniqueId);
      if (itemIndex !== -1) {
        this.cart.splice(itemIndex, 1);
        this.saveCart();
      } else {
        console.error(`Item with uniqueId ${uniqueId} not found.`);
      }
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
      const updatedCart = this.cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
        instructions: item.instructions || "",
        uniqueId: item.uniqueId
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
      const newItem = {
        ...suggestion,
        quantity: 1,
        totalPrice: suggestion.price,
        uniqueId: Date.now() + Math.random()
      };
      this.cart.push(newItem);
      this.saveCart();
    }
  }
};
</script>

<style scoped>
.review-order {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.order-item {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.order-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1.5rem;
}

.item-details {
  flex-grow: 1;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.item-price {
  font-size: 1.1rem;
  color: #28a745;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.quantity-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.1s;
}

.quantity-btn:hover {
  background-color: #0056b3;
}

.quantity-btn:active {
  transform: scale(0.95);
}

.quantity {
  margin: 0 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.special-instructions {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  resize: vertical;
  min-height: 60px;
  font-size: 0.9rem;
  transition: border-color 0.3s;
}

.special-instructions:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.remove-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.remove-icon {
  font-size: 1.5rem;
  color: #dc3545;
  transition: color 0.3s;
}

.remove-icon:hover {
  color: #c82333;
}

.order-summary {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.total-text {
  font-size: 2rem;
  font-weight: 700;
  color: #28a745;
  margin-bottom: 1.5rem;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.back-btn, .checkout-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  flex: 1;
  max-width: 200px;
}

.back-btn {
  background-color: #6c757d;
  color: white;
}

.back-btn:hover {
  background-color: #5a6268;
}

.checkout-btn {
  background-color: #28a745;
  color: white;
}

.checkout-btn:hover {
  background-color: #218838;
}

.back-btn:active, .checkout-btn:active {
  transform: scale(0.98);
}

.suggested-items {
  margin-top: 3rem;
}

.suggested-items h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.suggested-items-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.suggested-item {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.suggested-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1.5rem;
}

.suggestion-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.add-suggestion-btn {
  background-color: #ffc107;
  color: #333;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.1s;
}

.add-suggestion-btn:hover {
  background-color: #e0a800;
}

.add-suggestion-btn:active {
  transform: scale(0.95);
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.empty-cart-message {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.back-to-main-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

.back-to-main-btn:hover {
  background-color: #0056b3;
}

.back-to-main-btn:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .review-order {
    padding: 1rem;
  }

  h2 {
    font-size: 2rem;
  }

  .order-item {
    flex-direction: column;
  }

  .item-image {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .buttons-container {
    flex-direction: column;
  }

  .back-btn, .checkout-btn {
    width: 100%;
    margin-bottom: 1rem;
  }

  .suggested-items-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .suggested-image {
    height: 150px;
  }
}

@media (max-width: 480px) {
  .buttons-container {
    flex-direction: column;
  }

  .back-btn, .checkout-btn {
    max-width: none;
  }
}
</style>