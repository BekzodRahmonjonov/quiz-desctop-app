<template>
  <div>
    <!-- Табы -->
    <div>
      <div class="sm:hidden">
        <label for="tabs"
          class="sr-only">Select a tab</label>
        <select id="tabs"
          name="tabs"
          v-model="selectedTab"
          class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option v-for="tab in tabs"
            :key="tab.name"
            :value="tab.name">
            {{ tab.name }} ({{ tab.count }})
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8"
            aria-label="Tabs">
            <a v-for="tab in tabs"
              :key="tab.name"
              href="#"
              @click.prevent="filterByTab(tab.name)"
              :class="[
            tab.current
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
          ]"
              :aria-current="tab.current ? 'page' : undefined">
              {{ tab.name }} ({{ tab.count }})
            </a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Таблица с результатами -->
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 scrollbar overflow-x-auto min-h-[700px] w-full max-w-[1300px] sm:-mx-6 lg:-mx-8">
        <div v-if="filteredResults.length > 0"
          class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Ism</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Guruh</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Yoshi</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Jinsi</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unvoni</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sana</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kategoriya</th>
                <th class="px-3 text-nowrap py-3.5 text-left text-sm font-semibold text-gray-900"
                  v-for="student in filteredResults[0].categories"
                  :key="student.name">{{ student.name }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="student in filteredResults"
                :key="student.name">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{{ student.name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.className }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.age }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.gender }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.title }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.date }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.category }}</td>
                <td v-for="(el, index) in student.categories"
                  :key="index"
                  class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{{ el.score }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else
          class="text-center flex items-center justify-center h-[200px] text-gray-500 text-lg font-semibold">
          Bo'sh
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-center gap-3">
      <button v-if="selectedTab == 'Barcha'"
        :disabled="!students.length"
        @click="confirmAndClearResults"
        :class="{
            '!bg-[gray]': !students.length
          }"
        class="bg-red-500 hover:bg-red-600 text-white px-12 py-2 rounded shadow font-semibold">
        Tozalash
      </button>
      <button v-if="selectedTab == 'Barcha'"
        :disabled="!students.length"
        @click="exportToExcel"
        :class="{
            '!bg-[gray]': !students.length
          }"
        class="bg-green-500 hover:bg-green-600 text-white px-12 py-2 rounded shadow font-semibold">
        Import
      </button>
    </div>
  </div>
</template>

<script>
const categoryDefinitions = {
  Yuqori: ["Yuqori", "Yuqori", "O‘rта", "Yuqori", "Past", "Yuqori", "Past"],
  Barqaror: ["O‘rта, Yuqori", "O‘rта, Yuqori", "O‘rта", "O‘rта", "O‘rта, Past", "O‘rта", "O‘rта, Past"],
  Qoniqarli: ["O‘rта", "O‘rта", "O‘rта, Yuqori", "O‘rта, Yuqori", "Yuqori", "Past", "Yuqori"],
  Past: ["Past", "Past", "Yuqori", "Yuqori", "Yuqori", "Past", "Yuqori"],
};

import * as XLSX from "xlsx";

export default {
  data() {
    return {
      tabs: [
        { name: "Barcha", count: 0, current: true },
        { name: "Yuqori", count: 0, current: false },
        { name: "Barqaror", count: 0, current: false },
        { name: "Qoniqarli", count: 0, current: false },
        { name: "Past", count: 0, current: false },
      ],
      selectedTab: "Barcha",
      students: [],
    };
  },
  computed: {
    filteredResults() {
      if (this.selectedTab === "Barcha") {
        return this.students;
      }
      return this.students.filter(
        (student) => student.category === this.selectedTab
      );
    },
  },
  methods: {
    loadStudents() {
      const savedResults = JSON.parse(localStorage.getItem("results")) || [];
      this.students = savedResults.map((result) => {
        const studentResults = result.categories.map((category) => category.level);
        const predominantCategory = this.determineStudentCategory(studentResults);
        return {
          name: result.name,
          className: result.className,
          gender: result.gender,
          age: result.age,
          title: result.title,
          date: result.date,
          categories: result.categories,
          category: predominantCategory,
        };
      });
      this.updateTabCounts();
    },
    exportToExcel() {
      const excelData = this.students.map((student) => {
        const categories = student.categories.reduce((acc, category, index) => {
          acc[category.name] = category.level + ' - ' + category.score;
          return acc;
        }, {});

        return {
          "Student Ismi": student.name,
          "Student Guruhi": student.className,
          "Student Yoshi": student.age,
          "Student Unvoni": student.title,
          "Student Jinsi": student.gender,
          "Sana": student.date,
          "Asosiy Kategoriya": student.category,
          ...categories,
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(excelData);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

      XLSX.writeFile(workbook, "students_with_categories.xlsx");
    },
    // determineStudentCategory(categories) {
    //   const categoryCount = {
    //     Yuqori: 0,
    //     Barqaror: 0,
    //     Qoniqarli: 0,
    //     Past: 0,
    //   };

    //   categories.forEach((item) => {
    //     categoryCount[item.level] = (categoryCount[item.level] || 0) + 1;
    //   });

    //   return Object.keys(categoryCount).reduce((a, b) =>
    //     categoryCount[a] > categoryCount[b] ? a : b
    //   );
    // },
    determineStudentCategory(studentResults) {
      const matchScores = {};

      for (const [category, scaleResults] of Object.entries(categoryDefinitions)) {
        let exactMatches = 0;
        let partialMatches = 0;

        for (let i = 0; i < studentResults.length; i++) {
          const expectedValues = scaleResults[i]
            .split(", ")
            .map((value) => value.trim());
          if (expectedValues.includes(studentResults[i])) {
            exactMatches++;
          } else if (expectedValues.some((value) => studentResults[i].includes(value))) {
            partialMatches++;
          }
        }

        matchScores[category] = exactMatches * 2 + partialMatches;
      }

      const bestMatch = Object.entries(matchScores).reduce((best, current) => {
        return current[1] > best[1] ? current : best;
      });

      return bestMatch[0];
    },
    updateTabCounts() {
      this.tabs.forEach((tab) => (tab.count = 0));

      this.students.forEach((student) => {
        const categoryTab = this.tabs.find(
          (tab) => tab.name === student.category
        );
        if (categoryTab) {
          categoryTab.count++;
        }
      });

      this.tabs.find((tab) => tab.name === "Barcha").count = this.students.length;
    },
    filterByTab(tabName) {
      this.selectedTab = tabName;
      this.tabs.forEach((tab) => {
        tab.current = tab.name === tabName;
      });
    },
    confirmAndClearResults() {
      const isConfirmed = window.confirm(
        "Barcha natijalarni o'chirishga ishonchingiz komilmi?"
      );
      if (isConfirmed) {
        this.clearAllResults();
      }
    },
    clearAllResults() {
      localStorage.removeItem("results");
      this.students = [];
    },
  },
  mounted() {
    this.loadStudents();
  },
};
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
</style>
