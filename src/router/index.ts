import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // check login state from local storage
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If the route requires authentication and user is not logged in, redirect to login page
    if (!isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
