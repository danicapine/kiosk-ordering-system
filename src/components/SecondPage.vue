<template>
  <div class="second-page">
    <div class="overlay"></div>
    <!-- Logo at the top part -->
    <div class="header-icon">
      <img :src="require('@/assets/apple-touch-icon.png')" alt="icon" />
    </div>
    <div class="content">
      <h1 class="title">Where will you be eating today?</h1>
      <div class="options">
        <!-- Eat In Image Button -->
        <button @click="selectOption('eat-in')" class="image-button">
          <img :src="require('@/assets/eat-in-image.jpg')" alt="Eat In" class="button-image" />
          <span class="button-text">DINE IN</span>
        </button>
        <!-- Take Out Image Button -->
        <button @click="selectOption('take-out')" class="image-button">
          <img :src="require('@/assets/take-out-image.jpg')" alt="Take Out" class="button-image" />
          <span class="button-text">TAKE OUT</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondPage',
  methods: {
    selectOption(option) {
      console.log(`You selected: ${option}`);
      // Add further logic, like navigating to another page or showing a message
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.second-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url('c:\Users\kayea\Downloads\462544617_835324245347209_4118324712242713421_n.png');
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
  z-index: 1;
}

.header-icon {
  position: absolute;
  top: 5px; /* Keeps logo at the very top */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 2;
}

.header-icon img {
  width: 150px;
  height: 150px;
  animation: pulse 1.5s infinite;
}

.content {
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto; /* Pushes content towards the bottom */
  padding-bottom: 25px; /* Adds extra space at the bottom */
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: 5em; /* Increased title font size */
  font-weight: bold;
  margin-bottom: 40px;
}

.options {
  display: flex;
  gap: 40px;
}

.image-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.2s;
}

.image-button:hover .button-image {
  transform: scale(1.1);
}

.button-image {
  width: 220px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.button-text {
  margin-top: 10px;
  font-size: 2.5em; /* Increased button text size */
  font-weight: bold;
  color: white;
  text-align: center;
}

/* Animations */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Tablet screens */
@media (max-width: 1024px) {
  .header-icon img {
    width: 120px;
    height: 120px;
  }
  .title {
    font-size: 3em;
  }
  .button-image {
    width: 180px;
  }
  .button-text {
    font-size: 1.3em;
  }
}

/* Mobile screens */
@media (max-width: 768px) {
  .header-icon img {
    width: 100px;
    height: 100px;
  }
  .title {
    font-size: 2.5em;
  }
  .button-image {
    width: 150px;
  }
  .button-text {
    font-size: 1.1em;
  }
}

/* Small mobile screens */
@media (max-width: 480px) {
  .header-icon img {
    width: 80px;
    height: 80px;
  }
  .title {
    font-size: 2em;
  }
  .button-image {
    width: 120px;
  }
  .button-text {
    font-size: 1em;
  }
}
</style>
