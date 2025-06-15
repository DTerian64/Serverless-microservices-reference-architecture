import { createApp } from 'vue'
import App from './App.vue'
import AppFooter from './components/AppFooter.vue'
import SignalRTrips from './components/SignalRTrips.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' // JS components
//import { bootstrapVueNext } from 'bootstrap-vue-next'
//import Loading from 'vue3-loading-overlay'
//import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
//import iziToast from 'izitoast' // Use directly, since vue-izitoast-2 is not Vue 3 compatible
//import 'izitoast/dist/css/iziToast.min.css'

import './assets/main.css' // If you have custom styles

const app = createApp(App)

// Register global components (if still needed globally)
//app.component('LoadingOverlay', Loading)
app.component('AppFooter', AppFooter)
app.component('SignalRTrips', SignalRTrips)


//app.use(bootstrapVueNext)


// Custom directive for scroll behavior
app.directive('scroll', {
  mounted(el, binding) {
    const f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

// Mixin
app.mixin({
  methods: {
    handleScroll(evt, el) {
      if (window.scrollY > 100) {
        el.setAttribute('class', 'navbar navbar-light navbar-expand-lg fixed-top navbar-shrink')
      } else {
        el.setAttribute('class', 'navbar navbar-light navbar-expand-lg fixed-top')
      }
    }
  }
})

app.use(store)
app.use(router)

// Mount the app
app.mount('#app')
