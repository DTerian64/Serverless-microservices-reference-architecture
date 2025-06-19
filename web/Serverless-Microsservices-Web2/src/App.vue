<template>
  <div id="app">   
    <nav v-scroll="handleScroll" class="navbar navbar-light navbar-expand-lg fixed-top" id="mainNav">
      <div class="container px-4 px-lg-5">
        <a class="navbar-brand" href="#page-top">Rideshare by Relecloud</a>
         <span v-if="user"> | Welcome, {{ user.username || user.name  }}</span>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
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
import { useRouter, RouterView, RouterLink } from 'vue-router';
import { auth } from '@/utils/Authentication';

const authenticated = ref(false)

const store = useStore();
const router = useRouter();

onMounted(async () => {
  console.log('onMounted called');
 // Wait for MSAL initialization if needed
  if (auth._initializePromise) {
    await auth._initializePromise;
  }

  authenticated.value = await auth.isAuthenticated()
  if (authenticated.value) {
    const user = await auth.getUser();
    store.dispatch('common/setUser', user || null);
  } else {
    store.dispatch('common/setUser', null);
  }
});


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


</script>

<style>
#mainNav .navbar-nav > li > a.router-link-exact-active {
  color: #fdcc52 !important;
  background-color: transparent;
}
</style>
