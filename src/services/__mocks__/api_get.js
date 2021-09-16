const fakeData = [
    {
        _id: '1',
        name: 'test',
        html: '<p>testtext</p>',
        date: '2021-09-16'
    }
];

export default async function apiGet(url) {
    return await new Promise((resolve) => {
        resolve(fakeData);
    })

    return response.data;
}
