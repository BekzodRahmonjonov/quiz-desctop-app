<template>
  <div class="flex bg-[#f8f8f894]">
    <!-- Sidebar -->
    <div class="flex flex-col min-h-screen w-64 bg-white border-r border-gray-200 shadow-t">
      <div class="flex items-center justify-center h-16 border-b border-gray-200">
        <img class="h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
      </div>

      <nav class="mt-6 px-4 flex-1">
        <ul class="space-y-1">
          <li>
            <a @click="currentView = 'questions'" class="cursor-pointer block rounded-md py-2 pl-8 pr-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Savollar
            </a>
          </li>
          <li>
            <a @click="currentView = 'results'" class="cursor-pointer block rounded-md py-2 pl-8 pr-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Natijalar
            </a>
          </li>
          <li>
            <a @click="currentView = 'password'" class="cursor-pointer block rounded-md py-2 pl-8 pr-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Parolni yangilash
            </a>
          </li>
        </ul>
      </nav>

      <div class="px-4 py-6">
        <a href="#" class="text-sm font-semibold text-[#54B4E3] hover:underline">
          Chiqish
        </a>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 p-8">
      <component :is="currentViewComponent" />
    </div>
  </div>
</template>

<script>
import Questions from '../components/Questions.vue'
import Results from '../components/Results.vue'
import UpdatePassword from '../components/UpdatePassword.vue'

export default {
  data() {
    return {
      currentView: 'questions', // Default view
    };
  },
  computed: {
    currentViewComponent() {
      switch (this.currentView) {
        case 'questions':
          return Questions;
        case 'results':
          return Results;
        case 'password':
          return UpdatePassword;
        default:
          return Questions;
      }
    }
  }
}
</script>

<style>
.shadow-t {
  box-shadow: -18px 0px 20px 0px;
}
</style>
