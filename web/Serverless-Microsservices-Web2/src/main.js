import { createApp } from 'vue';
import App from './App.vue';
import AppFooter from './components/AppFooter.vue';
import SignalRTrips from './components/SignalRTrips.vue';
import router from './router';
import store from './store';

import * as BootstrapVueNext from 'bootstrap-vue-next';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { toast } from 'vue3-toastify';

// BlockUI is not Vue 3 compatible; consider alternatives
// import BlockUI from 'vue-blockui'; ❌ Not compatible with Vue 3

const app = createApp(App);

// Register global components if needed
app.component('AppFooter', AppFooter);
app.component('SignalRTrips', SignalRTrips);

// Register plugins
app.use(store);
app.use(router);
app.use(BootstrapVueNext);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right',
});

// Add custom directive
app.directive('scroll', {
  mounted(el, binding) {
    const handler = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', handler);
      }
    };
    window.addEventListener('scroll', handler);
  }
});

// Add global mixin
app.mixin({
  methods: {
    handleScroll(evt, el) {
      if (window.scrollY > 100) {
        el.setAttribute('class', 'navbar navbar-light navbar-expand-lg fixed-top navbar-shrink');
      } else {
        el.setAttribute('class', 'navbar navbar-light navbar-expand-lg fixed-top');
      }
    }
  }
});

// Mount the app
app.mount('#app');
