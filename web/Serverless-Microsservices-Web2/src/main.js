import { createApp } from 'vue';
import App from './App.vue';
import AppFooter from './components/AppFooter.vue';
import SignalRTrips from './components/SignalRTrips.vue';
import router from './router';
import store from './store';

import {
  BTable,
  BButton,
  BModal,
  BFormRow,
  BCol,
  BContainer,
} from 'bootstrap-vue-next';

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import 'vue3-toastify/dist/index.css';
import Vue3Toastify, { toast } from 'vue3-toastify';

import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
export default {
  components: {
    Loading
  }
}

const app = createApp(App);

// Register global components if needed
app.component('AppFooter', AppFooter);
app.component('SignalRTrips', SignalRTrips);

app.component('BTable', BTable);
app.component('BButton', BButton);
app.component('BModal', BModal);
app.component('BFormRow', BFormRow);
app.component('BCol', BCol);
app.component('BContainer', BContainer);

// Register plugins
app.use(store);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right',
});
//app.use(BootstrapVueNext);

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
