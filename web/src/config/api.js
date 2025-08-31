const isDev = import.meta.env.DEV;
export const API_BASE_URL = isDev 
  ? '/api'
  : 'https://auth-flow-api.gaelgomes.dev/api';
