import App from '../App.vue';
import store from '../store';
import router from '../router';

export default {
  title: 'App',
};

export const Default = () => {
  store.dispatch('common/setAuthenticated', true);  // 👈 Force authentication
  store.dispatch('common/setUser', { name: 'Test User' }); // 👈 Optional mock user
  router.push('/');

  return {
    components: { App },
    template: '<App />',
    setup() {
      return {};
    },
  };
};
