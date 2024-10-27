<template>
  <div class="menu-container">
    <h1>Main Menu</h1>
    <div class="menu-grid">
      <div class="menu-item" v-for="item in menuItems" :key="item.name" @click="addItemToOrder(item)">
        <img :src="item.image" :alt="item.name" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.calories }} Cal</p>
        <p>${{ item.price.toFixed(2) }}</p>
      </div>
    </div>
    <div class="order-summary">
      <p>My Order - {{ orderType }} | Tax: ${{ tax.toFixed(2) }} | Total: ${{ total.toFixed(2) }} | Items: {{ itemCount }}</p>
      <button @click="cancelOrder">Cancel Order</button>
      <button :disabled="itemCount === 0">Done</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { name: "Coca-Cola", calories: 120, price: 1.0, image: "c:\\Users\\kayea\\Downloads\\462548707_578287071443923_3140033151104978666_n.jpg" },
        { name: "Vanilla Shake", calories: 360, price: 1.5, image: "c:\\Users\\kayea\\Downloads\\462538028_536345125765442_6366026137616671576_n.jpg" },
        { name: "Hot Chocolate", calories: 200, price: 1.2, image: "c:\\Users\\kayea\\Downloads\\462548643_556714456761680_2644308230400882128_n.jpg" },
        { name: "Bacon & Biscuit", calories: 400, price: 2.5, image: "c:\\Users\\kayea\\Downloads\\462572943_578143518219429_3718052836942044023_n.jpg" },
      ],
      orderType: "Eat-in",
      taxRate: 0.1, // 10% tax rate
      itemsInOrder: [],
    };
  },
  computed: {
    itemCount() {
      return this.itemsInOrder.length;
    },
    total() {
      const subtotal = this.itemsInOrder.reduce((sum, item) => sum + item.price, 0);
      return subtotal + this.tax;
    },
    tax() {
      const subtotal = this.itemsInOrder.reduce((sum, item) => sum + item.price, 0);
      return subtotal * this.taxRate;
    },
  },
  methods: {
    addItemToOrder(item) {
      this.itemsInOrder.push(item);
    },
    cancelOrder() {
      this.itemsInOrder = [];
    },
  },
};
</script>

<style scoped>
.menu-container {
  text-align: center;
}
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}
.menu-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}
.menu-item:hover {
  transform: scale(1.05);
}
.menu-item img {
  width: 100px;
  height: auto;
}
.order-summary {
  margin-top: 20px;
}
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
