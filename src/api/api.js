import axios from 'axios';

const config = {
    baseURL: 'https://restcountries.eu/rest/v2/',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
};

const api = axios.create(config);

export default api;