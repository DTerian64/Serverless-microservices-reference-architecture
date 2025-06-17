<template>
  <div></div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
import * as signalR from '@microsoft/signalr';
import { getPassenger } from '@/api/passengers';

const store = useStore();

// Vuex Getters
const notificationSystem = computed(() => store.getters['common/notificationSystem']);
const user = computed(() => store.getters['common/user']);
const trip = computed(() => store.getters['trips/trip']);
const currentStep = computed(() => store.getters['trips/currentStep']);
const contentLoading = computed(() => store.getters['trips/contentLoading']);

// Vuex Actions
const setTrip = (payload) => store.dispatch('trips/setTrip', payload);
const setCurrentStep = (payload) => store.dispatch('trips/setCurrentStep', payload);
const createTrip = (payload) => store.dispatch('trips/createTrip', payload);
const getSignalRInfo = () => store.dispatch('trips/getSignalRInfo');

// Watch for user login to trigger SignalR connection
watch(user, (newVal, oldVal) => {
  if (oldVal === null && newVal !== null) {
    connectToSignalR();
  }
});

let connection;

function connectToSignalR() {
  getSignalRInfo().then((info) => {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(info.url, {
        accessTokenFactory: () => info.accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on('TripCreated', (tripId) => {
      if (notificationSystem.value) {
        notificationSystem.value.addNotification({
          message: 'Your trip has been created!',
          level: 'success'
        });
      }

      getPassenger().then((response) => {
        const passenger = response.data;
        const newTrip = {
          id: tripId,
          passengerId: passenger.id,
          status: 'New',
          driverId: null,
          pickupLocation: passenger.location,
          dropOffLocation: ''
        };
        setTrip(newTrip);
        setCurrentStep('ride');
      });
    });

    connection.start().catch((err) => console.error('SignalR error:', err.toString()));
  });
}

onMounted(() => {
  if (user.value) {
    connectToSignalR();
  }
});
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
