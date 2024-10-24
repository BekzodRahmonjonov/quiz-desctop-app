<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 bg-image">
    <div class="sm:max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
      <h2 class="text-center text-2xl font-bold text-gray-900">Ma'lumotlaringizni kiriting</h2>
      
      <form class="mt-8 space-y-6" @submit.prevent="startQuiz">
        <!-- Name Input -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">FIO</label>
          <div class="mt-2">
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              required
              class="px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ismingizni kiriting"
            />
          </div>
        </div>

        <!-- Class Name Input -->
        <div>
          <label for="className" class="block text-sm font-medium text-gray-700">Guruh nomini kiriting</label>
          <div class="mt-2">
            <input
              id="className"
              v-model="className"
              name="className"
              type="text"
              required
              class="px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Guruh nomini kiriting"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full flex justify-center bg-[#54B4E3] text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:bg-[#52afdd] focus:outline-none focus:ring-2 focus:ring-[#52afdd] focus:ring-offset-2"
          >
            Testni boshlash
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      className: ''
    };
  },
  methods: {
    startQuiz() {
      // Navigate to quiz questions
      this.$router.push('/quiz');
    }
  }
}
</script>

<style scoped>
/* Additional global styles can be added here */
</style>
