import { createRouter, createWebHashHistory } from 'vue-router'
import StudentView from '../views/StudentView.vue'
import AdminLogin from '../components/AdminLogin.vue'
import QuizForm from '../components/QuizForm.vue'

const routes = [
  { path: '/', redirect: '/student' },
  { path: '/student', component: StudentView },
  { path: '/quiz', component: QuizForm },
  { path: '/admin-login', component: AdminLogin },
  { path: '/admin', component: () => import('../views/AdminView.vue') }
]

const router = createRouter({
  history: createWebHashHistory(), // Use hash mode
  routes
})

export default router
