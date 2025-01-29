import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorView from '@/views/AuthorView.vue'
import MemberView from '@/views/MemberView.vue'
import MemberBorrowedView from '@/views/MemberBorrowedView.vue'
import CreateBookView from '@/views/CreateBookView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/author',
    name: 'author',
    component: AuthorView
  }, 
  {
    path: "/member",
    name: 'member',
    component: MemberView
  },
  {
    path: "/borrowed",
    name: 'borrowed',
    component: MemberBorrowedView
  },
  {
    path: "/create",
    name: 'create',
    component: CreateBookView
  },
  {
    path: "/edit",
    name: 'edit',
    component: CreateBookView
  },
  {
    path: "/borrow",
    name: 'borrow',
    component: CreateBookView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
