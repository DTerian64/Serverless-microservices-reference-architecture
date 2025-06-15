import { checkResponse, get, post } from '@/utils/http';
//const baseUrl = 'http://localhost:7071/api';
const baseUrl = import.meta.env.VITE_API_TRIPS_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY || '' // fallback to empty string if not defined

// GET methods
export function getSignalRInfo(username) {
  let customHeader = null;
  if (username) {
    customHeader = { 'x-ms-signalr-userid': username };
  }
  return get(`${baseUrl}/signalrinfo`, {}, apiKey, customHeader).then(checkResponse);
}

// POST methods
export function createTrip(trip) {
  return post(`${baseUrl}/trips`, trip, apiKey).then(checkResponse);
}
