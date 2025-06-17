<template>
  <div>
    <header class="masthead masthead-custom">
      <div class="container h-100" style="height:155px;">
        <div class="row justify-content-center h-100" style="height:120px;">
          <div class="col-12 col-lg-7 mt-auto" style="height:80px;">
            <div class="mx-auto header-content">
              <h1 class="mb-5">
                MY TRIP
                <img class="float-right" src="../assets/img/ride-icon.png" alt="Start my ride" />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
    <BlockUI message="Please wait..." :html="html" v-show="contentLoading" />
    <section id="features" class="features" style="padding-top:60px;">
      <div class="container">
        <div class="section-heading text-center" style="margin-bottom:50px;">
          <h2>Find my ride!</h2>
          <p class="text-muted">Confirm your pickup and drop-off location.</p>
        </div>
        <!-- Add Trip Form Content Here -->
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
