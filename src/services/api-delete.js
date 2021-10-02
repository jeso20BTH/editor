import axios from 'axios';

export default async function apiDelete(url, body, token=null) {
    let response;

    if (token) {
        let config = {
            headers: {
                'x-access-token': token
            },
            data: body
        };

        response = await axios.delete(
            url,
            config
        );
    } else {
        response = await axios.delete(
            url,
            body
        );
    }




    return response.data;
}
