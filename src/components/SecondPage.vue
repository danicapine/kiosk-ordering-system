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
      // Navigate to MainMenu with the selected option
      this.$router.push({ name: 'MainMenu', query: { option } });
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
  background-image: url('@/assets/kioskhomebg.png');
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

.header-icon {
  position: absolute;
  top: 5px; /* Keeps logo at the very top */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 3; /* Ensure logo is above the overlay */
}

.header-icon img {
  width: 10vw; /* Responsive width for logo */
  height: auto; /* Maintain aspect ratio */
  animation: pulse 1.5s infinite;
}

.content {
  z-index: 2; /* Keep content above overlay */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center the content vertically */
  flex-grow: 1; /* Allow the content to grow and occupy space */
  padding: 20px; /* Add padding for better spacing */
  margin-top: 70px; /* Space from the top to avoid overlapping the logo */
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: 6vw; /* Responsive font size */
  font-weight: bold;
  margin-bottom: 10px;
}

.options {
  display: flex;
  justify-content: center; /* Center buttons horizontally */
  align-items: flex-end; /* Align items at the bottom */
  gap: 5vw; /* Maintain gap between buttons */
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
  position: relative; /* Ensure text is correctly positioned inside the button */
}

.button-image {
  width: 23vw; /* Responsive width for button image */
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.button-text {
  margin-top: 10px; /* Space between image and text */
  font-size: 2.5vw; /* Responsive font size */
  font-weight: bold;
  color: white;
  text-align: center;
  position: relative; /* Changed to relative */
  padding: 0 5px; /* Optional padding to ensure it's readable */
  background-color: transparent; /* Removed background color */
  bottom: -5px; /* Adjust this value to position below the image */
}

/* Hover effect */
.image-button:hover .button-image {
  transform: scale(1.05); /* Slight scale effect on hover */
}

/* Animations */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Media queries for responsiveness */
@media (max-width: 1024px) {
  .title {
    font-size: 5vw; /* Adjusted for tablet */
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 4vw; /* Adjusted for mobile */
  }
}

@media (max-width: 480px) {
  .title {
    font-size: 3.5vw; /* Adjusted for small mobile */
  }
}
</style>
