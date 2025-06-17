<template>
  <div>
    <header class="masthead masthead-custom">
      <div class="container h-100" style="height:155px;">
        <div class="row justify-content-center h-100" style="height:120px;">
          <div class="col-12 col-lg-7 mt-auto" style="height:80px;">
            <div class="mx-auto header-content">
              <h1 class="mb-5">
                DRIVERS
                <img class="float-right" src="../assets/img/driver-icon.png" alt="Drivers" />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
    <BlockUI message="Please wait..." :html="html" v-show="contentLoading" />
    <section id="features" class="features" style="padding-top:60px;">
      <div class="container text-center">
        <h2>View driver information</h2>
        <p class="text-muted">View all drivers and their availability.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const html = ref('');
const contentLoading = ref(false);
</script>

<style scoped>
/* Add styling as needed */
</style>
