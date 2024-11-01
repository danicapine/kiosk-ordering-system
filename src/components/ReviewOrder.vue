<template>
    <div class="review-order">
      <h2>Review My Order</h2>
      <div v-if="cart.length > 0">
        <div v-for="item in cart" :key="item.id" class="order-item">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>₱ {{ item.totalPrice.toFixed(2) }}</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
          </div>
          <button @click="removeItem(item.id)">Remove</button>
        </div>
        <div class="order-summary">
          <h3>Total: ₱ {{ total.toFixed(2) }}</h3>
          <button @click="proceedToCheckout">Proceed to Checkout</button>
        </div>
      </div>
      <div v-else>
        <p>Your cart is empty. Please add items to your order.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ReviewOrder',
    data() {
      return {
        cart: []
      };
    },
    computed: {
      total() {
        return this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
      }
    },
    created() {
      this.loadCart();
    },
    methods: {
      loadCart() {
        // Retrieve cart data from localStorage
        const storedCart = localStorage.getItem('cart');
        this.cart = storedCart ? JSON.parse(storedCart) : [];
        console.log('Loaded cart:', this.cart); // Debugging: check if cart loads correctly
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
        console.log('Saved cart:', this.cart); // Debugging: check if cart saves correctly
      },
      proceedToCheckout() {
        this.$router.push('/checkout');
      }
    }
  };
  </script>
  
  <style scoped>
  .review-order {
    padding: 20px;
  }
  .order-item {
    display: flex;
    margin-bottom: 15px;
  }
  .item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 15px;
  }
  .item-details {
    flex-grow: 1;
  }
  .quantity-controls {
    display: flex;
    align-items: center;
  }
  button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  .order-summary {
    margin-top: 20px;
  }
  </style>
  