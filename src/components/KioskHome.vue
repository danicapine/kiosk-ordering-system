<template>
  <div class="home-screen">
    <div class="overlay"></div> <!-- Overlay for background -->
    <div class="content">
      <p class="small-text">Fast & Easy</p>
      <h1 class="large-text">
        <span class="bordered-text">Order<br />& pay<br />here</span>
      </h1>
      <div class="down-arrow">
        <!-- Arrow Cursor Icon -->
        <svg width="48" height="48" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L10.59 3.41 17.17 10H3v2h14.17l-6.58 6.59L12 22l10-10z"/>
        </svg>
      </div>
    </div>
    <button class="start-button" @click="navigateToNextPage">
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
      // Change the path to the desired next page
      this.$router.push({ path: '/next-page' });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.home-screen {
  position: relative; /* Make parent position relative for overlay */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center;
  height: 100vh;
  background-image: url('c:/Users/ADMIN/Downloads/International Coffee Day Facebook Cover.png');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 20px; /* Add padding to prevent content from touching edges */
}

.overlay {
  position: absolute; /* Position overlay absolute */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  z-index: 1; /* Ensure it stays behind the text */
}

.content {
  flex-grow: 1;
  z-index: 2; /* Ensure content stays above overlay */
}

.small-text {
  font-size: 2em; /* Use responsive font size */
  margin-bottom: 10px;
}

.large-text {
  font-family: 'Playfair Display', serif;
  font-size: 5em; /* Default size */
  font-weight: bold;
  line-height: 1.2;
}

.bordered-text {
  border: 3px solid black;
  padding: 10px;
  display: inline-block;
}

.down-arrow {
  font-size: 3em; /* Use responsive size */
  margin-top: 10px;
}

.start-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(111, 78, 55, 0.8);
  width: 100%;
  padding: 20px;
  font-size: 1.5em; /* Default size */
  font-weight: bold;
  color: white;
  border: none; /* Remove default button border */
  cursor: pointer; /* Change cursor to pointer */
  z-index: 2; /* Ensure it stays above overlay */
}

.start-button:hover {
  background-color: rgba(111, 78, 55, 1); /* Darker on hover */
}

.icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.icon svg {
  margin-right: 10px; /* Add space between icons */
}

/* Media Queries for responsiveness */
@media (max-width: 768px) {
  .small-text {
    font-size: 1.5em; /* Adjust for tablets */
  }
  
  .large-text {
    font-size: 4em; /* Adjust for tablets */
  }

  .down-arrow {
    font-size: 2.5em; /* Adjust for tablets */
  }

  .start-button {
    padding: 15px; /* Adjust padding */
    font-size: 1.2em; /* Adjust size */
  }
}

@media (max-width: 480px) {
  .small-text {
    font-size: 1.2em; /* Further adjust for mobile */
  }

  .large-text {
    font-size: 3.5em; /* Further adjust for mobile */
  }

  .down-arrow {
    font-size: 2em; /* Further adjust for mobile */
  }

  .start-button {
    padding: 10px; /* Adjust padding */
    font-size: 1em; /* Adjust size */
  }
}
</style>
