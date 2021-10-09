import BaseAPI from './baseApi';
import HTTPTransport from '../utils/http/HTTPtransport';

export class LoginApi extends BaseAPI {
    private http: HTTPTransport;
    constructor() {
        super();
        this.http = new HTTPTransport(this.host);
    }

    signIn(data) {
        const url = '/auth/signin';
        const options = {
            data,
            headers: {
                'content-type': 'application/json'
            }
        };
        return this.http.post(url, options);
    }

    logout() {
        const url = '/auth/logout';
        const options = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return this.http.post(url, options);
    }
}