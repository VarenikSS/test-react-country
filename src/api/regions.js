import api from './api';

export async function fetchRegionsRequest() {
    const { data } = await api.get('/all?fields=region');
    const regionNames = [...new Set(data.map(obj => obj.region))].filter(el => el.length > 0);
    return regionNames;
}

export async function fetchRegionCountryRequest(title) {
    const { data } = await api.get(`/region/${title.toLowerCase()}`);
    return data;
}