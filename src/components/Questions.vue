<template>
  <div>
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Savollar</h1>
          <p class="mt-2 text-sm text-gray-700">Savollar ro'yxati</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button @click="openModal('add')" class="block rounded-md bg-[#54B4E3] px-3 py-2 text-center text-sm font-semibold text-white">
            Savol qo'shish
          </button>
        </div>
      </div>

      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Savol</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Javob</th>
                  <th class="relative py-3.5 pl-3 pr-4">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="question in questions" :key="question.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{{ question.text }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ question.answer }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                    <a @click="openModal('edit', question)" class="text-[#54B4E3] hover:text-[#52afdd]">Edit</a> |
                    <a @click="openModal('delete', question)" class="text-red-600 hover:text-red-900">Delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <QuestionModal v-if="modalOpen" :modalType="modalType" :question="selectedQuestion" @close="modalOpen = false" />
  </div>
</template>

<script>
import QuestionModal from '../components/QuestionModal.vue'

export default {
  data() {
    return {
      questions: [
        { id: 1, text: 'Is Vue.js awesome?', answer: 'Yes' },
        { id: 2, text: 'Do you like TailwindCSS?', answer: 'Yes' }
      ],
      modalOpen: false,
      modalType: 'add',
      selectedQuestion: null,
    };
  },
  components: {
    QuestionModal
  },
  methods: {
    openModal(type, question = null) {
      this.modalType = type;
      this.selectedQuestion = question;
      this.modalOpen = true;
    }
  }
}
</script>

<style scoped>
/* Scoped styles */
</style>
