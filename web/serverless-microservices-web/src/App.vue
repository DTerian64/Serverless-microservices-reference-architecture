<template>
  <div>
    <nav v-scroll="handleScroll" class="navbar navbar-light navbar-expand-lg fixed-top" id="mainNav">
      <div class="container">
        <RouterLink :to="{ name: 'home' }" class="navbar-brand">Rideshare by Relecloud</RouterLink>
        <button class="navbar-toggler float-right" data-toggle="collapse"
          data-target="#navbarResponsive" aria-controls="navbarResponsive"
          aria-expanded="false" aria-label="Toggle navigation"><i class="fa fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" role="presentation">
              <RouterLink :to="{ name: 'trip' }" class="nav-link">My Trip</RouterLink>
            </li>
            <li class="nav-item" role="presentation">
              <RouterLink :to="{ name: 'passengers' }" class="nav-link">Passengers</RouterLink>
            </li>
            <li class="nav-item" role="presentation">
              <RouterLink :to="{ name: 'drivers' }" class="nav-link">Drivers</RouterLink>
            </li>
            <li class="nav-item" role="presentation" v-if="user">
              <a href="javascript:void(0)" class="nav-link" @click="logout">Logout</a>
            </li>
            <li class="nav-item" role="presentation" v-else>
              <a href="javascript:void(0)" class="nav-link" @click="login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView :authenticated="authenticated" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Authentication } from '@/utils/Authentication';

const auth = new Authentication();
const authenticated = ref(auth.authenticated);
const store = useStore();
const router = useRouter();

const user = computed(() => store.getters['common/user']);

function login() {
  auth.login().then(
    (u) => {
      store.dispatch('common/setUser', u || null);
    },
    () => {
      store.dispatch('common/setUser', null);
    }
  );
}

function logout() {
  if (confirm('Are you sure you wish to log out?')) {
    auth.logout().then(() => {
      store.dispatch('common/setUser', null);
      router.push('/');
    });
  }
}

onMounted(() => {
  const u = auth.getUser();
  store.dispatch('common/setUser', u || null);
});
</script>

<style>
#mainNav .navbar-nav > li > a.router-link-exact-active {
  color: #fdcc52 !important;
  background-color: transparent;
}
</style>
