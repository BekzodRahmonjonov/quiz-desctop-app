<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 bg-image">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <!-- Title -->
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-6">
        Admin Login
      </h2>

      <!-- Login Form -->
      <form @submit.prevent="login" class="space-y-6">
        <!-- Username Input -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            class="mt-2 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your username"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="mt-2 px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>

        <!-- Login Button -->
        <div>
          <button
            type="submit"
            class="w-full flex justify-center bg-[#54B4E3] text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:bg-[#52afdd] focus:outline-none focus:ring-2 focus:bg-[#52afdd] focus:ring-offset-2"
          >
            Login
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-4 text-center text-red-600">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      // Example login check: Adjust as per your authentication logic
      if (this.username === 'admin' && this.password === 'password') {
        this.$router.push('/admin'); // Navigate to admin dashboard
      } else {
        this.errorMessage = 'Invalid username or password.'; // Display error
      }
    }
  }
};
</script>

<style>
.bg-image {
  background-image: url('../assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
