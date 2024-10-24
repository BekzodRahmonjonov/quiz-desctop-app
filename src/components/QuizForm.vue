<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 bg-image">
    <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <!-- Progress Navigation -->
      <nav class="flex items-center justify-center mb-6" aria-label="Progress">
        <p class="text-sm font-medium text-gray-700">Step {{ currentStep + 1 }} of {{ questions.length }}</p>
        <ol role="list" class="ml-8 flex items-center space-x-5">
          <li v-for="(question, index) in questions" :key="index">
            <span
              class="block h-3 w-3 rounded-full transition-transform duration-300"
              :class="{
                'bg-[#54B4E3] scale-125': index === currentStep,
                'bg-gray-300': index !== currentStep
              }"
            >
              <span class="sr-only">Step {{ index + 1 }}</span>
            </span>
          </li>
        </ol>
      </nav>

      <!-- Quiz Questions -->
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Quiz</h2>
      <div v-if="!finished">
        <div v-if="questions[currentStep]" class="mb-4">
          <p class="text-center text-xl font-semibold text-gray-900">{{ questions[currentStep].text }}</p>
          <div class="flex justify-center space-x-8 mt-6">
            <label class="text-lg">
              <input type="radio" v-model="selectedAnswer" value="yes" /> Ha
            </label>
            <label class="text-lg">
              <input type="radio" v-model="selectedAnswer" value="no" /> Yo'q
            </label>
          </div>
        </div>

        <!-- Next Question Button -->
        <div class="text-center mt-8">
          <button
            class="btn bg-[#54B4E3] hover:bg-[#52afdd] shadow-md text-white px-6 py-3 rounded transition-all duration-200"
            @click="nextQuestion"
            :disabled="!selectedAnswer"
          >
            {{ currentStep === questions.length - 1 ? 'Finish Test' : 'Keyingi Savol' }}
          </button>
        </div>
      </div>

      <!-- Quiz Finished Message -->
      <div v-if="finished" class="text-center mt-8">
        <h3 class="text-lg font-bold text-gray-800">Muvaffaqiyatli yakunladingiz!</h3>
        <button 
          class="btn bg-gray-400 hover:bg-gray-500 shadow-md text-white px-6 py-3 rounded mt-6 transition-all duration-200"
          @click="resetQuiz"
        >
          Asosiy sahifaga qaytish
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        { text: 'Osmon ko‘kmi?', answer: null },
        { text: 'Suv ho‘lmi?', answer: null },
        { text: 'Olov issiqmi?', answer: null },
        { text: 'Yer dumaloqmi?', answer: null },
        { text: 'Tunda qorong‘imi?', answer: null },
        { text: 'Daraxtlar yashilmi?', answer: null },
        { text: 'Odamlar yuradimi?', answer: null },
        { text: 'Qushlar uchadimi?', answer: null },
        { text: 'Kompyuter elektrda ishlaydimi?', answer: null },
        { text: 'Qahva achchiqmi?', answer: null }
      ],
      currentStep: 0,
      selectedAnswer: '',
      finished: false
    };
  },
  methods: {
    nextQuestion() {
      // Save the selected answer to the current question
      this.questions[this.currentStep].answer = this.selectedAnswer;

      // Move to the next question if not the last one
      if (this.currentStep < this.questions.length - 1) {
        this.currentStep++;
        this.selectedAnswer = ''; // Reset the answer for the next question
      } else {
        this.finished = true; // Mark quiz as finished
      }
    },
    resetQuiz() {
      // Reset the quiz state
      this.currentStep = 0;
      this.selectedAnswer = '';
      this.finished = false;
      this.$router.push('/');
      // If you want to navigate to the main page, you can use a router
      // this.$router.push({ name: 'Home' }); // Uncomment and set the appropriate route if using Vue Router
    }
  }
};
</script>

<style>
/* Add your styles here if needed */
</style>
