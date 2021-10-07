import axios from 'axios';

export default async function apiPost(url, body, token=null) {
    let response;

    if (token) {
        let config = {
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        response = await axios.post(
            url,
            body,
            config
        );
    } else {
        response = await axios.post(
            url,
            body
        );
    }




    return response.data;
}
