<template>
  <div>
    <header class="masthead masthead-home">
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-lg-7 my-auto">
            <div class="mx-auto header-content">
              <h1 class="mb-5">
                Rideshare by Relecloud will get you there! Find a driver in seconds.
                Forget about the other crowded and tired options and improve your ride share experience today.
              </h1>
              <RouterLink class="btn btn-outline-warning btn-xl js-scroll-trigger" :to="{ name: 'trip' }">
                Find my ride!
              </RouterLink>
            </div>
          </div>
          <div class="col-lg-5 my-auto">
            <div class="device-container">
              <div class="device-mockup iphone6_plus portrait white">
                <div class="device device-iphone">
                  <div class="screen">
                    <img class="img-fluid" src="@/assets/img/rideshare-mock-app.png" alt="App mockup" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section id="download" class="download text-center bg-primary">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto">
            <h2 class="section-heading">Use the ride share app like no other... today!</h2>
            <p>Our app is available on any mobile device! Download now to get started!</p>
            <div class="badges">
              <a href="#" class="badge-link">
                <img src="@/assets/img/google-play-badge.svg" alt="Google Play" />
              </a>
              <a href="#" class="badge-link">
                <img src="@/assets/img/app-store-badge.svg" alt="App Store" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="features">
      <div class="container">
        <div class="section-heading text-center">
          <h2>We get you there faster, with less hassle.</h2>
          <p class="text-muted">
            Our simplified approach to finding rides and communicating trip details will let you
            think about your destination, not how you get there...
          </p>
          <hr />
        </div>
        <div class="row">
          <div class="col-lg-4 my-auto">
            <div class="device-container">
              <div class="device-mockup iphone6_plus portrait white">
                <div class="device device-iphone">
                  <div class="screen">
                    <img class="img-fluid" src="@/assets/img/rideshare-mock-app.png" alt="App screenshot" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 my-auto">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-6" v-for="(feature, index) in features" :key="index">
                  <div class="feature-item">
                    <i :class="feature.icon + ' text-primary'"></i>
                    <h3>{{ feature.title }}</h3>
                    <p class="text-muted">{{ feature.text }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta cta-background">
      <div class="cta-content">
        <div class="container">
          <h2>Stop waiting.<br />Start riding.<br /></h2>
          <RouterLink class="btn btn-outline-warning btn-xl js-scroll-trigger" :to="{ name: 'trip' }">
            Find my ride!
          </RouterLink>
        </div>
      </div>
      <div class="overlay"></div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const features = [
  {
    icon: 'icon-screen-smartphone',
    title: 'Simple to use',
    text: "Just select 'Find my ride!' and wait for your driver... it's that simple!"
  },
  {
    icon: 'icon-star',
    title: 'Rating system',
    text: 'Our rating system is straightforward and easy to use.'
  },
  {
    icon: 'icon-map',
    title: 'Great coverage',
    text: 'We offer the highest number of drivers, all around the world!'
  },
  {
    icon: 'icon-speech',
    title: 'Get notified',
    text: 'Instant notifications mean you are less likely to miss your ride.'
  }
];
</script>

<style scoped>
header.masthead-home {
  background: url('@/assets/img/bg-pattern.png'), linear-gradient(to left, #7b4397, #dc2430);
  height: 100%;
  padding-top: 65px;
}
.device-iphone {
  background-image: url('@/assets/img/iphone_6_plus_white_port.png');
}
.cta-background {
  background-image: url('@/assets/img/bg-cta.jpg');
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
