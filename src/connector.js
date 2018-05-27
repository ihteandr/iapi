import * as axios from 'axios';

export class Connector{
    constructor(apiURL, timeout = 60000) {
        this.instance = axios.create({
            baseURL: apiURL,
            timeout: timeout,
            headers: {}
        });
    }
    setHeaders(newHeaders = {}) {
        const headers = this.instance.defaults.headers;
        headers.common = Object.assign(headers.common, newHeaders);
    }
    request(...args) {
        return this.instance.request(...args);
    }
    get(...args) {
        return this.instance.get(...args);
    }
    delete(...args) {
        return this.instance.delete(...args);
    }
    put(...args) {
        return this.instance.put(...args);
    }
    post(...args) {
        return this.instance.post(...args);
    }
}