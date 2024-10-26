<template>
    <div class="kiosk-home">
      <p class="fast-easy">Fast & Easy</p>
      <h1>Order & Pay Here</h1>
      <div class="icon-section">
        <span>&#x1F447;</span> <!-- Downward pointing finger emoji -->
      </div>
      <div class="start-button-container">
        <button class="btn-start" @click="orderNow">
          <span class="icon">&#x1F374;</span> <!-- Fork and knife emoji to represent food -->
          Touch to Start
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'KioskHome',
    methods: {
      orderNow() {
        console.log('Navigating to order page...');
        // Add navigation logic here
      },
      goFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { // Firefox
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
          elem.msRequestFullscreen();
        }
      },
    },
    mounted() {
      this.goFullscreen();
    },
  };
  </script>
  
  <style scoped>
  .kiosk-home {
    background-color: #001F3F; /* Navy blue background */
    color: #FF6F61; /* Pink text color */
    text-align: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .fast-easy {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #FFFFFF;
  }
  
  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
    color: #FFFFFF;
  }
  
  .icon-section {
    font-size: 2.5rem;
    margin: 1.5rem 0;
    color: #FFFFFF;
  }
  
  .start-button-container {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .btn-start {
    background-color: #FF6F61; /* Pink button color */
    color: white;
    font-size: 1.5rem;
    padding: 15px 30px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .btn-start:hover {
    background-color: #FF3B30; /* Darker pink on hover */
  }
  
  .icon {
    font-size: 1.5rem;
  }
  </style>