import axios from 'axios';

export default async function apiPost(url, body={}) {
    let response = await axios.post(
        url,
        body
    );

    return response.data;
}
