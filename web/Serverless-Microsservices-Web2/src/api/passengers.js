import { checkResponse, get } from '@/utils/http';
//const baseUrl = 'http://localhost:7071/api';
const baseUrl = import.meta.env.VITE_API_PASSENGERS_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY || '' // fallback to empty string if not defined

// GET methods
export function getPassengers() {
  return get(`${baseUrl}/passengers`, {}, apiKey).then(checkResponse);
}

export function getPassenger(userid) {
  return get(`${baseUrl}/passengers/${userid}`, {}, apiKey).then(checkResponse);
}
