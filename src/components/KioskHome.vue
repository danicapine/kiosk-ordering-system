<template>
  <div class="home-screen" @click="navigateToNextPage">
    <div class="overlay"></div> <!-- Overlay for background -->
    <div class="content">
      <p class="small-text">Fast & Easy</p>
      <h1 class="large-text">
        <span class="bordered-text">Order<br />& pay<br />here</span>
      </h1>
      <div class="touch-icon">
        <!-- Touchscreen Gesture Icon -->
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" fill="none" />
          <path d="M12 8V12M12 12h-2M12 12h2M12 8h-2M10 8c0 1.11-.89 2-2 2s-2-.89-2-2 .89-2 2-2 2 .89 2 2z" fill="white" />
        </svg>
      </div>
    </div>
    <button class="start-button" @click.stop="navigateToNextPage">
      <div class="icon">
        <!-- Coffee Order Icon -->
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6h-2.5C17 4.67 15.33 3 13.5 3S10 4.67 10 6.5V8H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-7.5-2c.83 0 1.5.67 1.5 1.5S13.33 7 12.5 7 11 6.33 11 5.5 11.67 4 12.5 4zm4 12H8v-6h12v6zm-3-5h-4v-1h4v1z"/>
        </svg>
      </div>
      <span>Touch to start</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomeScreen',
  methods: {
    navigateToNextPage() {
      // Use Vue Router to navigate to the SecondPage component
      this.$router.push({ name: 'SecondPage' });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.home-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('c:/Users/ADMIN/Downloads/International Coffee Day Facebook Cover.png');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 20px;
  cursor: pointer; /* Indicates screen is clickable */
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

.content {
  flex-grow: 1;
  z-index: 2;
}

.small-text {
  font-size: 2em;
  margin-bottom: 10px;
}

.large-text {
  font-family: 'Playfair Display', serif;
  font-size: 5em;
  font-weight: bold;
  line-height: 1.2;
}

.bordered-text {
  border: 3px solid black;
  padding: 10px;
  display: inline-block;
}

.touch-icon {
  font-size: 1em;
  margin-top: 10px;
  display:block;
  align-items: center;
  justify-content: center;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.start-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(79, 53, 38, 0.8);
  width: 100%;
  padding: 20px;
  font-size: 2em;
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 2;
  animation: buttonPulse 1.5s infinite; /* Apply pulsing animation */
}

@keyframes buttonPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.start-button:hover {
  background-color: rgba(79, 53, 38, 1);
}


.icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.icon svg {
  margin-right: 10px;
}

/* Media Queries */
@media (max-width: 768px) {
  .small-text { font-size: 1.5em; }
  .large-text { font-size: 4em; }
  .touch-icon { font-size: 2.5em; }
  .start-button { padding: 15px; font-size: 1.2em; }
}

@media (max-width: 480px) {
  .small-text { font-size: 1.2em; }
  .large-text { font-size: 3.5em; }
  .touch-icon { font-size: 2em; }
  .start-button { padding: 10px; font-size: 1em; }
}
</style>
