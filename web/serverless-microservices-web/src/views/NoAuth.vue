<template>
  <div>
    <header class="masthead masthead-custom">
      <div class="container h-100" style="height:155px;">
        <div class="row justify-content-center h-100" style="height:120px;">
          <div class="col-12 col-lg-7 mt-auto" style="height:80px;">
            <div class="mx-auto header-content">
              <h1 class="mb-5">NO ACCESS</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section id="features" class="features" style="padding-top:60px;">
      <div class="container text-center">
        <h2>You're not signed in</h2>
        <p>Please <a href="javascript:void(0)" class="btn btn-danger action-button" @click="login">log in</a> to get started!</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Authentication } from '@/utils/Authentication';
const auth = new Authentication();

function login() {
  auth.login();
}
</script>

<style scoped>
/* Add styling as needed */
</style>
