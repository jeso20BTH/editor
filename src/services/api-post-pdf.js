import axios from 'axios';

export default async function apiPostPdf(url, body, token=null) {
    let config = {
        responseType: 'blob',
        headers: {
            'x-access-token': token
        }
    };

    let response = await axios.post(
        url,
        body,
        config
    );


    return response;
}
