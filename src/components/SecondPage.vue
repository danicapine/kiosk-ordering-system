<template>
  <div class="second-page">
    <div class="overlay"></div>
    <!-- Logo at the top part -->
    <div class="header-icon">
      <img :src="require('@/assets/apple-touch-icon.png')" alt="icon" />
    </div>
    <div class="content">
      <div class="options">
        <!-- Eat In Image Button -->
        <button @click="selectOption('eat-in')" class="image-button">
          <img :src="require('@/assets/dinein.png')" alt="Eat In" class="button-image" />
        </button>
        <!-- Take Out Image Button -->
        <button @click="selectOption('take-out')" class="image-button">
          <img :src="require('@/assets/takeout.png')" alt="Take Out" class="button-image" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondPage",
  methods: {
    selectOption(option) {
      console.log(`You selected: ${option}`);
      // Navigate to MainMenu with the selected option
      this.$router.push({ name: "MainMenu", query: { option } });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap");

html, body {
  overflow-x: hidden; /* Prevent horizontal scrolling */
}

.second-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url("@/assets/kioskhomebg.png");
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 20px;
  box-sizing: border-box; /* Ensure padding does not add to width */
  overflow-x: hidden; /* Prevent horizontal scrolling for this component */
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
  width: 12vw; /* Default size for logo */
  height: auto; /* Maintain aspect ratio */
  animation: pulse 1.5s infinite;
}

/* Logo size for tablets */
@media (max-width: 1024px) {
  .header-icon img {
    width: 15vw; /* Larger logo for tablets */
  }
}

/* Logo size for mobile screens */
@media (max-width: 768px) {
  .header-icon img {
    width: 20vw; /* Larger logo for smaller devices */
  }
}

/* Logo size for small mobile screens */
@media (max-width: 480px) {
  .header-icon img {
    width: 25vw; /* Largest logo for small mobile screens */
  }
}

.content {
  z-index: 2; /* Keep content above overlay */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center the content vertically */
  flex-grow: 1; /* Allow the content to grow and occupy space */
  padding: 20px; /* Add padding for better spacing */
  margin-top: 100px; /* Space from the top to avoid overlapping the logo */
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

/* Hover effect */
.image-button:hover .button-image {
  transform: scale(1.05); /* Slight scale effect on hover */
}

/* Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Media queries for responsiveness */
@media (max-width: 1024px) {
  .button-image {
    width: 28vw; /* Adjusted size for tablet */
  }

  .options {
    gap: 8vw; /* Reduce gap for tablets */
  }
}

@media (max-width: 768px) {
  .button-image {
    width: 35vw; /* Adjusted size for mobile */
  }

  .options {
    gap: 6vw; /* Reduce gap further for smaller screens */
  }
}

@media (max-width: 480px) {
  .button-image {
    width: 45vw; /* Adjusted size for small mobile */
  }

  .options {
    gap: 4vw; /* Minimal gap for small mobile screens */
  }
}
</style>
