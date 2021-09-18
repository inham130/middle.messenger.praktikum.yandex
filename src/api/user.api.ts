import { BaseAPI } from './baseApi';
import HTTPTransport from '../utils/http/HTTPtransport';

export class UserAPI extends BaseAPI {
    private http: HTTPTransport;

    constructor() {
        super();
        this.http = new HTTPTransport(this.host);
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

    update(data) {
        const url = '/user/profile';
        const options = {
            data,
            headers: {
                'content-type': 'application/json'
            }
        };
        return this.http.put(url, options);
    }

    changePassword(data) {
        const url = '/user/password';
        const options = {
            data,
            headers: {
                'content-type': 'application/json'
            }
        };

        return this.http.put(url, options);
    }

    uploadAvatar(data) {
        const url = '/user/profile/avatar';
        const options = {data};
        return this.http.put(url, options);
    }
}