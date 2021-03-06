import axios from 'axios';

export default async function apiPut(url, body, token=null) {
    let response;

    if (token) {
        let config = {
            headers: {
                'x-access-token': token
            }
        };

        response = await axios.put(
            url,
            body,
            config
        );
    } else {
        response = await axios.put(
            url,
            body
        );
    }




    return response.data;
}
