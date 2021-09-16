import axios from 'axios';

export default async function apiGet(url) {
    let response = await axios.get(url);

    return response.data;
}
