import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Trip from '@/views/Trip.vue'
import Drivers from '@/views/Drivers.vue'
import Passengers from '@/views/Passengers.vue'
import NoAuth from '@/views/NoAuth.vue'
import store from '@/store';

const routes = [
  { path: '/', name: 'home', component: Home, meta: { requiresAuth: false }  },
  { path: '/trip', name: 'trip', component: Trip, meta: { requiresAuth: true } },
  { path: '/drivers', name: 'drivers', component: Drivers, meta: { requiresAuth: true } },
  { path: '/passengers', name: 'passengers', component: Passengers, meta: { requiresAuth: true } },
  { path: '/noauth', name: 'noauth', component: NoAuth, meta: { requiresAuth: false }  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log('to.meta', to.meta);
  console.log('Redirecting to NoAuth:', to.fullPath);
  const isAuthenticated = store.getters['common/user'] !== null;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'noauth' }); // Redirect to NoAuth.vue
  } else {
    next(); // Proceed normally
  }
});

export default router
