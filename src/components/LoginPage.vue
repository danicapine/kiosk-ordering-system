<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="text-center">Chillax Cafe Admin Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
            placeholder="Enter username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      const defaultUsername = 'admin';
      const defaultPassword = 'chillaxcafe63472@';

      // Check if the username and password match the defaults
      if (this.username === defaultUsername && this.password === defaultPassword) {
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('adminUsername', this.username); // Store admin's username
        
        // Redirect to Admin Dashboard
        this.$router.push({ name: 'AdminDash' });
      } else {
        alert('Invalid credentials! Please try again.');
      }
    }
  }
};
</script>

<style scoped>
/* Basic styles for the login page with a cafe theme */
.login-container {
  background-image: url('@/assets/kioskhomebg.png'); /* Light background color to set the mood */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: #fff; /* White box to make the form stand out */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

h2 {
  font-family: 'Lobster', cursive;
  color: #6f4f27; /* Warm coffee brown color */
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  font-weight: bold;
  color: #6f4f27;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fafafa;
}

button[type="submit"] {
  background-color: #6f4f27; /* Coffee brown color */
  color: white;
  padding: 15px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #8e6a3b; /* Slightly lighter brown */
}

input:focus {
  outline: none;
  border-color: #6f4f27;
}

.form-group input::placeholder {
  color: #6f4f27;
}

@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
</style>
