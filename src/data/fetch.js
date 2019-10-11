
// const host = 'https://id-finder.herokuapp.com/api';
const host = 'http://192.168.43.233:5000/api'



export const getHost = {
    host: host,
}

export function get(url) {
    return new Promise((resolve, reject) => {
        const api = `${host}${url}`;
        const request = new XMLHttpRequest();
        request.open('GET', api)
        request.onload = () =>
            (request.status === 200) ?
                resolve(JSON.parse(request.response)) :
                reject();

        request.onerror = () => reject();
        request.send();
    })
};


export function send(url, formData) {
    return new Promise((resolve, reject) => {
        const api = `${host}${url}`;
        const request = new XMLHttpRequest();
        request.open('POST', api, true);
        request.onload = () => 
            (request.status === 200) ?
                resolve(JSON.parse(request.response)) :
                reject();

        request.onerror = () => reject();
        request.send(formData);
    })
}
