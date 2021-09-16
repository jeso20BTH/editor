import axios from 'axios';

export default async function apiPut(url, body) {
    let response = await axios.put(
        url,
        body
    );

    return response.data;
}
