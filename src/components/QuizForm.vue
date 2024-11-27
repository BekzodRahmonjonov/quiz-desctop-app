<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 bg-image">
    <div class="max-w-xl w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <!-- Timer Progress Bar -->
      <div class="w-full h-2 bg-gray-200 rounded-full mb-4 relative">
        <div class="h-full bg-[#54B4E3] rounded-full transition-all duration-100"
          :style="{ width: timerProgress + '%' }"></div>
      </div>

      <!-- Progress Navigation -->
      <nav class="flex items-center justify-center mb-6"
        aria-label="Progress">
        <p class="text-sm font-medium text-gray-700">
          Bosqich: {{ currentStep + 1 }} / {{ questions.length }}
        </p>
      </nav>

      <!-- Quiz Questions -->
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Savol</h2>
      <div v-if="!finished">
        <div v-if="questions[currentStep]"
          class="mb-4">
          <p class="text-center text-xl font-semibold text-gray-900">
            {{ questions[currentStep].text }}
          </p>
          <div class="flex justify-center space-x-4 mt-6">
            <button
              class="w-full btn bg-green-500 hover:bg-green-600 shadow-md text-white px-6 py-3 rounded transition-all duration-200"
              @click="selectAnswer('ha')">
              Ha
            </button>
            <button
              class="w-full btn bg-red-500 hover:bg-red-600 shadow-md text-white px-6 py-3 rounded transition-all duration-200"
              @click="selectAnswer('yoq')">
              Yo'q
            </button>
          </div>
        </div>
      </div>

      <!-- Quiz Finished Message -->
      <div v-if="finished"
        class="text-center mt-8">
        <h3 class="text-lg font-bold text-gray-800">Muvaffaqiyatli yakunladingiz!</h3>
        <h4 class="text-md mt-4">Natijalar:</h4>
        <ul class="mt-2">
          <li v-for="category in results"
            :key="category.name">
            <strong>{{ category.name }}:</strong> {{ category.score }} ball ({{ category.level }})
          </li>
        </ul>
        <button
          class="btn bg-gray-400 hover:bg-gray-500 shadow-md text-white px-6 py-3 rounded mt-6 transition-all duration-200"
          @click="resetQuiz">
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
        { text: 'Jahlim chiqqan paytlar bo‘ladi.', answer: null },
        { text: 'Xulq-atvorim tufayli muammoga duch kelmaganman.', answer: null },
        { text: 'Ba’zan boshim og‘rib turadi.', answer: null },
        { text: 'Bolaligimda mayda o‘g‘irlik qilardim.', answer: null },
        { text: 'Ba’zida miyamga shunday yomon fikrlar keladiki, ular haqida hech kimga aytmaganim ma’qul.', answer: null },
        { text: 'Bolaligimda ota-onam yoki o‘qituvchilarim boshqa bolalarni jazolashganlarida men quvonganman.', answer: null },
        { text: 'Xafa qilganni kechirish mumkin deb o‘ylamayman.', answer: null },
        { text: 'Ba’zida chakkamda dukullashni va bo‘ynim atrofida tomir urishini xis qilaman.', answer: null },
        { text: 'Men butun hayotim davomida burch tuyg‘usiga asoslangan tamoyillarga qat’iy amal qilaman.', answer: null },
        { text: 'Kimdir yoqimsiz holatdan chiqish uchun urinayotganini qiziqish bilan kuzataman.', answer: null },
        { text: 'Va’dalarimni bajarmagan paytlarim ham bo‘lgan.', answer: null },
        { text: 'Agar meni deyarli har kuni muvaffaqiyatsizliklar ta’qib qilmaganda, hayotim naqadar yaxshi bo‘lishi mumkinligi haqida o‘ylayman.', answer: null },
        { text: 'O‘z qilayotgan harakatlarimda men odamlarga to‘liq ishonish kerak, degan xulosaga amal qilmayman.', answer: null },
        { text: 'Ba’zi odamlar buyruq berishni juda yoqtiradilarki, xatto ular haq bo‘lsalar ham, men ularga qarshi borishga urinaman.', answer: null },
        { text: 'Menimcha, o‘z hayotimda men juda ko‘p narsalarni noto‘g‘ri qilganga o‘xshayman.', answer: null },
        { text: 'Agar men o‘tirgan bo‘lsam va birdan o‘rnimdan tursam ko‘z oldim qorong‘ulashib, boshim aylanib ketadi.', answer: null },
        { text: 'Ba’zida menda kimdir bilan janjallashish istagi paydo bo‘ladi.', answer: null },
        { text: 'Ba’zida men yolg‘on gapiraman.', answer: null },
        { text: 'O‘z manfaatlarimni himoya qilish zarur bo‘lsa, jismoniy kuch ishlatishdan ham qaytmayman.', answer: null },
        { text: 'Meni ko‘pincha noloyiq jazolashgan deb hisoblayman.', answer: null },
        { text: 'Qo‘llarim va oyoqlarim sovuq qotib ketayotganini yoki uvishib qolayotganini tez-tez xis qilaman.', answer: null },
        { text: 'Agarda o‘z fikrimda turish kerak bo‘lsa, barcha vositalar yaxshi deb hisoblayman.', answer: null },
        { text: 'Jinoyatchi qandaydir sababdan jazosiz qolib ketganini har gal bilsam, g‘azablanaman.', answer: null },
        { text: 'Men tushunmagan narsalar haqida gapirgan holatlarim bo‘lgan.', answer: null },
        { text: 'O‘z taqdirimdan norozi bo‘lishga yetarli asoslarim bor deb hisoblayman.', answer: null },
        { text: 'Ba’zida o‘zimni hech narsaga yaramaydigandek his qilaman.', answer: null },
        { text: 'Men bilan janjallashish yo‘llarini qidirayotgan odam bilan uchrashishdan qochmayman.', answer: null },
        { text: 'Ko‘pincha ishtaxam bo‘lmaydi.', answer: null },
        { text: 'Menda tez-tez shunday kayfiyat bo‘ladiki, hech nimani ko‘rmasam va eshitmasam deyman.', answer: null },
        { text: 'Men odamlarga bu haqiqatan ham muhimligi uchun emas, balki oddiy printsip bo‘yicha to‘sqinlik qilgan yoki ularga qarshi ish qilgan paytlarim bo‘lgan.', answer: null },
        { text: 'Ba’zan bugun qilishim kerak bo‘lgan ishni ertaga qoldiraman.', answer: null },
        { text: 'Agar meni do‘stimni xafa qilishsa, men o‘sha insondan o‘ch olishga harakat qilaman.', answer: null },
        { text: 'Menga suhbatdoshni sarosimaga soladigan tarzda savol yoki javob berishni yoqtiraman.', answer: null },
        { text: 'Men har doim mustaqil va oilaviy nazoratdan xoli bo‘lganman.', answer: null },
        { text: 'Agar men jarima xavfi ostida bo‘lmasam va yaqin atrofda mashinalar bo‘lmasa, o‘tish kerak bo‘lgan joydan emas, balki ko‘chani xohlagan joyidan kesib o‘tishim mumkin.', answer: null },
        { text: 'Men gapirayotgan narsalar ko‘p hollarda suhbatdoshlarimga haqiqatdan ham qiziqarli ekanligidan shubhalanib qolaman.', answer: null },
        { text: 'Hattoki ehtimoliy omadsizlik to‘g‘risidagi fikrdan xavotirlanaman va tashvishlanaman.', answer: null },
        { text: 'O‘yinda men g‘laba qozonishni afzal ko‘raman.', answer: null },
        { text: 'Men hech qachon qonun bilan bog‘liq muammolarga duch kelmaganman.', answer: null },
        { text: 'Boshqalarning ustidan kulishga qarshi emasman.', answer: null },
        { text: 'O‘zini aldashga yo‘l qo‘ygan odamni aldagan odamni qoralash ahmoqlikdir.', answer: null },
        { text: 'Men tanishlarim orasida muhim odamlar borligidan xursandman, bu menga salobat bag‘ishlaydi.', answer: null },
        { text: 'Gohida yaxshi ko‘rgan kishilarimning dilini og‘ritganman.', answer: null },
        { text: 'Ishonchim komilki, hayotning ma’nosini faqat bitta to‘g‘ri tushunish yo‘li bor.', answer: null },
        { text: 'Tanishlarim orasida menga yoqmaydigan odamlar ham bor.', answer: null },
        { text: 'Men mojarolar va qiyinchiliklardan qochishga harakat qilaman.', answer: null },
        { text: 'Ba’zan hayotda qancha qiyinchiliklarni boshdan kechirishim mumkinligini tasavvur qilishim bilan, dunyoga kelmaganim yaxshiroq edi deb o‘ylayman.', answer: null },
        { text: 'O‘ylaymanki, qonunni buzmasdan, uni chetlab o‘tishga harakat qilsa bo‘ladi.', answer: null },
        { text: 'Katta auditoriya oldida so‘zga chiqishdan tortinaman.', answer: null },
        { text: 'Mening kayfiyatim tez-tez o‘zgarib turadi.', answer: null },
        { text: 'Odamlarni asossiz deb hisoblagan qoidalarni buzganliklari uchun kechirish mumkin.', answer: null },
        { text: 'Ba’zida birov bilan g‘iybat qilaman.', answer: null },
        { text: 'Agar men biror narsadan kuchli xayajonlangan yoki achchiqlangan bo‘lsam, uni butun tanim bilan xis qilaman.', answer: null },
        { text: 'Ba’zida kutilmaganda, o‘zim tushunmagan narsalar haqida ishonch bilan gapira boshlayman.', answer: null },
        { text: 'Men boshqalarning ko‘rsatmalariga amal qilishdan ko‘ra, o‘z rejalarim bo‘yicha harakat qilishni afzal ko‘raman.', answer: null },
        { text: 'Ko‘p hollarda boshqalardan tez ranjiyman.', answer: null },
        { text: 'Agar kimdir meni jiddiy xafa qilsa, unga ham xuddi shunday javob qaytaraman.', answer: null },
        { text: 'Agar men bugun odatdagidan kamroq uxlagan bo‘lsam, ertasiga o‘zimni dam olgandek xis qila olmayman.', answer: null },
        { text: 'Hayotdan hamma narsani olishga intilayotgan odamlarni hukm qilish ahmoqlikdir.', answer: null },
        { text: 'Ba’zi masalalarni muhokama qilayotganda, men ko‘p o‘ylamasdan, boshqalarning fikriga qo‘shilganman.', answer: null },
        { text: 'Afsuski, meni oilamda ham, do‘stlarim davrasida ham tushunishmaydi.', answer: null },
        { text: 'Boshqalar men haqimda nima deb o‘ylashlari menga qiziq emas.', answer: null },
        { text: 'O‘z qilmishlarimdan ko‘pincha vijdonim qiynaladi.', answer: null },
        { text: 'Men o‘zimni shunday tutishga harakat qilamanki, atrofdagilar mening noroziligimga sababchi bo‘lishidan qo‘rqishsin.', answer: null },
        { text: 'Kimnidir menga yomon munosabatda bo‘lishi, meni kam tashvishlantiradi.', answer: null },
        { text: 'Men tez-tez hayolparast bo‘lib yuraman.', answer: null },
        { text: 'Agar men biror narsa qilishni xohlasam-u, lekin boshqalar buni qilish arzimaydi deb o‘ylashsa, men niyatimdan osongina voz kechishim mumkin.', answer: null },
        { text: 'Shunday bo‘ladiki, odobsiz va hatto behayo hazil meni kuldiradi.', answer: null },
        { text: 'Men yolg‘iz qolganimda o‘zimni nihoyatda baxtiyor xis qilaman.', answer: null },
        { text: 'Uyquga yotsam odatda bir necha daqiqadan so‘ng uxlab qolaman.', answer: null },
      ],
      categories: [
        {
          name: "Ishonchlilik",
          ha: [],
          yoq: [1, 5, 11, 18, 24, 31, 35, 38, 42, 45, 52, 60, 68],
          levels: [
            { range: [10, Infinity], label: "Past" },
            { range: [8, 9], label: "Qon.li" },
            { range: [0, 7], label: "Yuqori" },
          ],
        },
        {
          name: "Axloqiy normativlik (AN)",
          ha: [4, 14, 17, 20, 30, 34, 41, 44, 48, 51, 55, 59, 62],
          yoq: [2, 9, 23, 39, 46, 67],
          levels: [
            { range: [15, Infinity], label: "Past" },
            { range: [12, 14], label: "Qon.li" },
            { range: [0, 11], label: "Yuqori" },
          ],
        },
        {
          name: "Nevrotizm",
          ha: [3, 8, 16, 21, 28, 53, 58],
          yoq: [70],
          levels: [
            { range: [0, 0], label: "Past" },
            { range: [1, 1], label: "Qon.li" },
            { range: [2, Infinity], label: "Yuqori" },
          ],
        },
        {
          name: "Tajovuzkor agressivlik",
          ha: [7, 6, 10, 33, 40, 43, 54],
          yoq: [63],
          levels: [
            { range: [0, 0], label: "Past" },
            { range: [1, 1], label: "Qon.li" },
            { range: [2, Infinity], label: "Yuqori" },
          ],
        },
        {
          name: "Depressivlik",
          ha: [12, 15, 25, 26, 29, 36, 37, 47, 50, 61, 66],
          yoq: [],
          levels: [
            { range: [0, 3], label: "Past" },
            { range: [4, 5], label: "Qon.li" },
            { range: [6, Infinity], label: "Yuqori" },
          ],
        },
        {
          name: "Reaktiv agressivlik",
          ha: [7, 13, 19, 22, 27, 32, 57, 64],
          yoq: [],
          levels: [
            { range: [0, 3], label: "Past" },
            { range: [4, 5], label: "Qon.li" },
            { range: [6, Infinity], label: "Yuqori" },
          ],
        },
        {
          name: "Emotsional labilnost",
          ha: [8, 26, 29, 49, 50, 56, 61, 69],
          yoq: [65],
          levels: [
            { range: [0, 3], label: "Past" },
            { range: [4, 5], label: "Qon.li" },
            { range: [6, Infinity], label: "Yuqori" },
          ],
        },
      ],
      currentStep: 0,
      finished: false,
      timerProgress: 100,
      timer: null,
      results: [],
    };
  },
  methods: {
    selectAnswer(answer) {
      this.questions[this.currentStep].answer = answer;

      this.nextQuestion();
    },
    nextQuestion() {
      if (this.currentStep < this.questions.length - 1) {
        this.currentStep++;
        this.resetTimer();
      } else {
        this.finished = true;
        this.calculateResults();
        this.clearTimer();
        this.saveResultsToLocalStorage();
      }
    },
    calculateResults() {
      this.results = this.categories.map((category) => {
        let score = 0;

        category.ha.forEach((questionIndex) => {
          if (this.questions[questionIndex - 1]?.answer === "ha") {
            score++;
          }
        });

        category.yoq.forEach((questionIndex) => {
          if (this.questions[questionIndex - 1]?.answer === "yoq") {
            score++;
          }
        });

        const level = category.levels.find(
          (l) => score >= l.range[0] && score <= l.range[1]
        )?.label;

        return {
          name: category.name,
          score,
          level: level || "No level",
        };
      });
    },
    saveResultsToLocalStorage() {
      const savedResults = JSON.parse(localStorage.getItem("results")) || [];
      const currentResult = {
        studentName: JSON.parse(localStorage.getItem("student")).name || "No Name",
        studentGroup: JSON.parse(localStorage.getItem("student")).group || "-",
        date: new Date().toLocaleString(),
        categories: this.results,
      };
      savedResults.push(currentResult);
      localStorage.setItem("results", JSON.stringify(savedResults));
    },
    resetQuiz() {
      this.currentStep = 0;
      this.finished = false;
      this.questions.forEach((q) => (q.answer = null));
      this.timerProgress = 100;
      this.results = [];
      this.resetTimer();
      localStorage.removeItem('student')
      this.$router.push('/student');
    },
    resetTimer() {
      this.clearTimer();
      this.timerProgress = 100;
      this.timer = setInterval(() => {
        if (this.timerProgress > 0) {
          this.timerProgress -= 100 / 30; // 30 seconds
        } else {
          this.selectAnswer(null); // Auto-move if time runs out
        }
      }, 1000);
    },
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  mounted() {
    this.resetTimer(); // Start the timer on mount
  },
  beforeDestroy() {
    this.clearTimer(); // Clear timer on component destroy
    localStorage.removeItem("student")
  },
};
</script>

<style>
/* Optional styles */
</style>
