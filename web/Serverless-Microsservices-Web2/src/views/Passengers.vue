<template>
  <div>
    <header class="masthead masthead-custom">
        <div class="container h-100" style="height:155px;">
            <div class="row justify-content-center h-100" style="height:120px;">
                <div class="col-12 col-lg-7 mt-auto" style="margin:0px;margin-top:0px;margin-bottom:0px;height:80px;max-width:100%;">
                    <div class="mx-auto header-content">
                        <h1 class="mb-5">PASSENGERS<img class="float-right" src="../assets/img/rider-icon.png" alt="Passengers"></h1>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <Loading
      :active="contentLoading"
      :is-full-page="false"
      :can-cancel="false"
      :color="'#000'"
      :loader="'spinner'"
      :opacity="0.5"
      message="Please wait..."
    />   
    <section id="features" class="features" style="padding-top:60px;">
        <div class="container">
            <div class="section-heading text-center" style="margin-bottom:50px;">
                <h2>View passenger information</h2>
                <p class="text-muted">View all passengers and passenger profile information</p>
                <hr>
                <div class="card border-danger">
                    <div class="card-body">
                        <h4 class="card-title">All Passengers</h4>
                        <b-table show-empty
                            responsive
                            striped
                            hover
                            :items="passengers"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            >
                            <template #cell(givenName)="data">{{ data.item.givenName }}</template>                            
                            <template #cell(surame)="data">{{ data.item.surname }}</template>
                            <template #cell(email)="data">{{ data.item.email }}</template>
                            <template #cell(state)="data">{{ data.item.state }}</template>
                            <template #cell(postalCode)="data">{{ data.item.postalCode }}</template>                            
                            <template #cell(actions)="data">
                                <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                                <b-button size="sm" @click.stop="selectPassenger(data.item)" class="mr-1">
                                Select
                                </b-button>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Passenger information modal -->
    <b-modal id="passengerInformationModal"
            ref="modalRef"
            title="PASSENGER INFORMATION"
            header-bg-variant="warning"
            header-text-variant="dark"
            footer-bg-variant="light"
            footer-text-variant="dark">
      <b-container fluid>
        <b-form-row>
          <b-col><em><strong>First name</strong></em></b-col><b-col>{{selectedPassenger.givenName}}</b-col>
        </b-form-row>
        <b-form-row>
          <b-col><em><strong>Last name</strong></em></b-col><b-col>{{selectedPassenger.surname}}</b-col>
        </b-form-row>
        <b-form-row>
          <b-col><em><strong>Display name</strong></em></b-col><b-col>{{selectedPassenger.displayName}}</b-col>
        </b-form-row>
        <hr />
        <b-form-row>
          <b-col><em><strong>Street address</strong></em></b-col><b-col>{{selectedPassenger.streetAddress}}</b-col>
        </b-form-row>
        <b-form-row>
          <b-col><em><strong>City</strong></em></b-col><b-col>{{selectedPassenger.city}}</b-col>
        </b-form-row>
        <b-form-row>
          <b-col><em><strong>State/province</strong></em></b-col><b-col>{{selectedPassenger.state}}</b-col>
        </b-form-row>
        <b-form-row>
          <b-col><em><strong>Postal code</strong></em></b-col><b-col>{{selectedPassenger.postalCode}}</b-col>
        </b-form-row>
        <b-form-row>
          <b-col><em><strong>Country</strong></em></b-col><b-col>{{selectedPassenger.country}}</b-col>
        </b-form-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
         <p class="float-left">Passenger information retrieved from the Graph API</p>
         <b-btn size="sm" class="float-right" variant="primary" @click="hideModal()">
           Close
         </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters: commonGetters } = createNamespacedHelpers('common');
const {
  mapGetters: passengerGetters,
  mapActions: passengerActions
} = createNamespacedHelpers('passengers');

import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
   components: {
    Loading
  },
  name: 'Passengers',
  props: ['authenticated'],
  data() {
    return {
      message: '',
      passengers: [],
      html: '<i class="fas fa-cog fa-spin fa-3x fa-fw"></i>',
      fields: [
        { key: 'givenName', label: 'First Name', sortable: true },
        { key: 'surname', label: 'Last Name', sortable: true },
        { key: 'email', label: 'Email' },
        { key: 'state', label: 'State' },
        {
          key: 'postalCode',
          label: 'PostalCode',
          class: 'text-right'
        },
        { key: 'actions', label: '' }
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15]
    };
  },
  computed: {
    ...commonGetters(['notificationSystem']),
    ...passengerGetters(['selectedPassenger', 'contentLoading'])
  },
  methods: {
    ...passengerActions(['getPassengers', 'setSelectedPassenger']),
    retrievePassengers() {
      this.getPassengers()
        .then(response => {
          this.passengers = response;
        })
        .catch(err => {
          this.$toast.error(
            err.response ? err.response : err.message ? err.message : err,
            'Error',
            this.notificationSystem.options.error
          );
        });
    },
    selectPassenger(passenger) {
      this.setSelectedPassenger(passenger);
      this.$refs.modalRef.show();
    },
    hideModal() {
      this.$refs.modalRef.hide();
    }
  },
  mounted() {
    console.log('Passengers component mounted - retrieving passengers ');
    this.retrievePassengers();
  }
};
</script>