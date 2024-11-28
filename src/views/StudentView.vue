<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 bg-image">
    <div class="sm:max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
      <h2 class="text-center text-2xl font-bold text-gray-900 mb-6">Ma'lumotlaringizni kiriting</h2>

      <form class="space-y-6" @submit.prevent="startQuiz">
        <!-- Name Input -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">FIO</label>
          <div class="mt-2">
            <input id="name"
              v-model="name"
              name="name"
              type="text"
              required
              class="px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ismingizni kiriting" />
          </div>
        </div>

        <!-- Gender Select (Jinsi) -->
        <div>
          <label for="gender" class="block text-sm font-medium text-gray-700">Jinsi</label>
          <div class="mt-2">
            <select id="gender"
              v-model="gender"
              name="gender"
              required
              class="px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="" disabled selected>Jinsni tanlang</option>
              <option value="Erkak">Erkak</option>
              <option value="Ayol">Ayol</option>
            </select>
          </div>
        </div>

        <!-- Title Select (Unvoni) -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Unvoni</label>
          <div class="mt-2">
            <select id="title"
              v-model="title"
              name="title"
              required
              class="px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="" disabled selected>Titullarni tanlang</option>
              <option value="Askar">Askar</option>
              <option value="ShAHX">ShAHX</option>
              <option value="Kursant">Kursant</option>
              <option value="Leytenant">Leytenant</option>
              <option value="Katta leytenant">Katta leytenant</option>
              <option value="Kapitan">Kapitan</option>
              <option value="Mayor">Mayor</option>
              <option value="Podpolkovnik">Podpolkovnik</option>
            </select>
          </div>
        </div>

        <!-- Class Name Input (Bo'linma nomi) -->
        <div>
          <label for="className" class="block text-sm font-medium text-gray-700">Guruh nomini kiriting</label>
          <div class="mt-2">
            <input id="className"
              v-model="className"
              name="className"
              type="text"
              required
              class="px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Guruh nomini kiriting" />
          </div>
        </div>

        <!-- Age Input (Yoshi) -->
        <div>
          <label for="age" class="block text-sm font-medium text-gray-700">Yoshi</label>
          <div class="mt-2">
            <input id="age"
              v-model="age"
              name="age"
              type="number"
              required
              min="10"
              max="100"
              class="px-4 py-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Yoshingizni kiriting" />
          </div>
        </div>

        <div class="flex justify-end">
          <router-link to="/admin-login" class="text-blue-600 underline hover:text-blue-800">Siz adminmi?</router-link>
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit"
            class="w-full flex justify-center bg-[#54B4E3] text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:bg-[#52afdd] focus:outline-none focus:ring-2 focus:ring-[#52afdd] focus:ring-offset-2">
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
      gender: '', 
      title: '', 
      className: '', 
      age: ''
    };
  },
  methods: {
    startQuiz() {
      if (!this.name || !this.gender || !this.title || !this.className || !this.age) {
        alert('Iltimos, barcha maydonlarni to\'ldiring.');
        return;
      }

      localStorage.setItem('student', JSON.stringify({
        name: this.name,
        gender: this.gender,
        title: this.title,
        group: this.className,
        age: this.age
      }));

      this.$router.push('/quiz');
    }
  }
}
</script>

<style scoped>
</style>
