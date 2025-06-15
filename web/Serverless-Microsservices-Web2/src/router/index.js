import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Trip from '@/views/Trip.vue'
import Drivers from '@/views/Drivers.vue'
import Passengers from '@/views/Passengers.vue'
import NoAuth from '@/views/NoAuth.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/trip', name: 'trip', component: Trip },
  { path: '/drivers', name: 'drivers', component: Drivers },
  { path: '/passengers', name: 'passengers', component: Passengers },
  { path: '/noauth', name: 'noauth', component: NoAuth }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
