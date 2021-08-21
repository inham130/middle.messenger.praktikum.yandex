import { BaseAPI } from './baseApi';
import HTTPTransport from '../utils/http/HTTPtransport';

export class SignUpApi extends BaseAPI {
    private http: HTTPTransport;

    constructor() {
        super();
        this.http = new HTTPTransport(this.host);
    }

    create(data) {
        const url = '/auth/signup';
        const options = {
            data,
            headers: {
                'content-type': 'application/json'
            }
        };
        return this.http.post(url, options);
    }

    request() {
        const url = '/auth/user';
        const options = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return this.http.get(url, options);
    }
}