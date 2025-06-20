import { createStore } from 'vuex'
import passengers from '@/store/passengers';

const store = createStore({
  modules: {
    passengers,
    common: {
      namespaced: true,
      state: () => ({ user: null, notificationSystem: null }),
      getters: {
        user: (state) => state.user,
        notificationSystem: (state) => state.notificationSystem
      },
      actions: {
        setUser({ commit }, user) {
          commit('setUser', user)
        }
      },
      mutations: {
        setUser(state, user) {
          state.user = user
        }
      }
    },
    trips: {
      namespaced: true,
      state: () => ({ trip: null, currentStep: '', contentLoading: false }),
      getters: {
        trip: (state) => state.trip,
        currentStep: (state) => state.currentStep,
        contentLoading: (state) => state.contentLoading
      },
      actions: {
        setTrip({ commit }, trip) {
          commit('setTrip', trip)
        },
        setCurrentStep({ commit }, step) {
          commit('setCurrentStep', step)
        },
        getSignalRInfo() {
          return Promise.resolve({ url: '/signalr-hub', accessToken: 'mock-token' })
        }
      },
      mutations: {
        setTrip(state, trip) {
          state.trip = trip
        },
        setCurrentStep(state, step) {
          state.currentStep = step
        }
      }
    }
  }
})

export default store
