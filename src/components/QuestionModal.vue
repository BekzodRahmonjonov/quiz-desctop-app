<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center transition-opacity">
    <div class="relative bg-white rounded-lg shadow-lg sm:max-w-lg w-full mx-4">
      <div v-if="modalType === 'delete'" class="p-6 text-center">
        <h3 class="text-2xl font-semibold text-gray-900">Savolni o'chirish</h3>
        <p class="mt-4 text-gray-600">Ushbu savolni o'chirishga ishonchingiz komilmi?</p>
        <div class="mt-6 flex justify-center space-x-4">
          <button @click="confirmDelete" class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300">Tasdiqlash</button>
          <button @click="$emit('close')" class="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300">Bekor qilish</button>
        </div>
      </div>

      <div v-else class="p-6">
        <h3 class="text-2xl font-semibold text-gray-900">{{ modalType === 'add' ? 'Savol qo\'shish' : 'Savolni o\'zgartirish' }}</h3>
        <div class="mt-6">
          <label for="question" class="block text-lg font-medium text-gray-700">Savol</label>
          <input v-model="questionText" type="text" class="mt-2 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
        </div>
        <div class="mt-6">
          <label for="answer" class="block text-lg font-medium text-gray-700">Javob</label>
          <select v-model="answer" class="mt-2 w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
        <div class="mt-6 flex justify-center space-x-4">
          <button @click="saveQuestion" class="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300">{{ modalType === 'add' ? 'Qo\'shish' : 'O\'zgartirish' }}</button>
          <button @click="$emit('close')" class="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300">Bekor qilish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modalType', 'question'],
  data() {
    return {
      questionText: this.question ? this.question.text : '',
      answer: this.question ? this.question.answer : 'Yes'
    };
  },
  methods: {
    saveQuestion() {
      // Save logic here
      this.$emit('close');
    },
    confirmDelete() {
      // Delete logic here
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}
button:hover {
  transform: translateY(-2px);
}
</style>
