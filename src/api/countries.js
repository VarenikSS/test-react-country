import api from './api';

export async function fetchCountryRequest(code) {
    const { data } = await api.get(`/alpha/${code}`);
    return data;
}