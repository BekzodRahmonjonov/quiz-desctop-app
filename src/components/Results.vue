<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Natijalar</h1>
    <p class="mb-6 text-sm text-gray-500">Quyida talabalarning natijalari ko'rsatilgan.</p>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Ism</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Javoblar</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">To'g'ri javoblar</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Natija (%)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="result in results" :key="result.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{{ result.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ result.answers }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ result.correctAnswers }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ result.percentage }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [
        {
          id: 1,
          name: 'John Doe',
          answers: 8,
          correctAnswers: 7,
          percentage: 87.5,
        },
        {
          id: 2,
          name: 'Jane Smith',
          answers: 10,
          correctAnswers: 9,
          percentage: 90,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Scoped styles */
</style>
