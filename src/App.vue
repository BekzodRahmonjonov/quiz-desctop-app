<template>
  <div v-if="$route.path === '/'" class="bg-gray-100 min-h-screen flex flex-col items-center justify-center bg-image">
    <div class="text-center mb-10">
      <h1 class="text-5xl font-semibold text-gray-800">Siz kimsiz tanlang</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
      <!-- Student Card -->
      <div class="flex flex-col justify-between rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-300 hover:shadow-xl transition-shadow">
        <div>
          <div class="flex justify-center mb-4">
            <span class="text-4xl font-semibold text-gray-900">Student</span>
          </div>
          <p class="text-gray-600 text-center">
            Ushbu bo'lim talabalarga testlarni yechish va bilimlarini oshirish uchun mo'ljallangan.
          </p>
        </div>
        <router-link to="/student">
          <a class="mt-8 block rounded-md bg-[#54B4E3] px-5 py-2 text-center text-white text-sm font-semibold leading-6 shadow-sm hover:bg-[#50aad8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54B4E3]">
            Kirish
          </a>
        </router-link>
      </div>

      <!-- Admin Card -->
      <div class="flex flex-col justify-between rounded-lg bg-white p-8 shadow-lg ring-1 ring-gray-300 hover:shadow-xl transition-shadow">
        <div>
          <div class="flex justify-center mb-4">
            <span class="text-4xl font-semibold text-gray-900">Admin</span>
          </div>
          <p class="text-gray-600 text-center">
            Ushbu bo'lim ma'murlarga savollar yaratish va foydalanuvchilarni boshqarish uchun mo'ljallangan.
          </p>
        </div>
        <router-link to="/admin-login">
          <a class="mt-8 block rounded-md bg-[#54B4E3] px-5 py-2 text-center text-white text-sm font-semibold leading-6 shadow-sm hover:bg-[#52afdd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52afdd]">
            Kirish
          </a>
        </router-link>
      </div>
    </div>
  </div>
  <div>
    <router-view />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  mounted() {
    console.log('Hello World!');
  }
}
</script>

<style scoped>
body {
  @apply bg-gray-100;
}
</style>
