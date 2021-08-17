import { BaseAPI } from '../../../utils/api/baseApi';
import HTTPTransport from '../../../utils/http/HTTPtransport';

export class SignUpApi extends BaseAPI {
    private http: HTTPTransport;

    constructor() {
        super();
        this.http = new HTTPTransport();
    }

    create(data) {
        const url = this.baseURL + '/auth/signup';
        const options = {
            data,
            headers: {
                'content-type': 'application/json'
            }
        };
        this.http.post(url, options);
    }
}