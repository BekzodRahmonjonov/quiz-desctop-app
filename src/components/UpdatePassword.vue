<template>
  <div class="space-y-12">
    <div class="border-b border-gray-900/10 pb-12">
      <h1 class="text-2xl font-bold leading-7 text-gray-900">Parolni yangilash</h1>

      <form @submit.prevent="updatePassword"
        class="mt-10">
        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <!-- Eski parol -->
          <div class="sm:col-span-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Eski parol</label>
            <div class="mt-2">
              <input type="password"
                v-model="oldPassword"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#54B4E3] sm:text-sm sm:leading-6" />
            </div>
          </div>

          <!-- Yangi parol -->
          <div class="sm:col-span-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Yangi parol</label>
            <div class="mt-2">
              <input type="password"
                v-model="newPassword"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#54B4E3] sm:text-sm sm:leading-6" />
            </div>
          </div>

          <!-- Yangi parolni takrorlang -->
          <div class="sm:col-span-4">
            <label class="block text-sm font-medium leading-6 text-gray-900">Yangi parolni takrorlang</label>
            <div class="mt-2">
              <input type="password"
                v-model="confirmPassword"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#54B4E3] sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
            @click="cancelChange">Bekor qilish</button>
          <button type="submit"
            class="rounded-md bg-[#54B4E3] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#52afdd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52afdd]">Yangilash</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorMessage: '',
      password: "password",
    };
  },
  methods: {
    cancelChange() {
      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.errorMessage = '';
    },

    updatePassword() {
      const savedPassword = localStorage.getItem('password');

      const password = savedPassword ? savedPassword : this.password;
      if (this.oldPassword !== password) {
        this.errorMessage = 'Eski parol noto\'g\'ri.';
        alert(this.errorMessage)
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Yangi parol va tasdiq parol bir xil emas.';
        alert(this.errorMessage)
        return;
      }

      localStorage.setItem('password', this.newPassword);

      this.oldPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.errorMessage = '';

      alert('Parol muvaffaqiyatli yangilandi!');
    }
  }
}
</script>

<style scoped>
/* Scoped styles */
</style>
