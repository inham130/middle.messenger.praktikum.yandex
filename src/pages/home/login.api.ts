import { BaseAPI } from '../../utils/api/baseApi';
import HTTPTransport from '../../utils/http/HTTPtransport';

export class LoginApi extends BaseAPI {
    constructor() {
        super();
        const http = new HTTPTransport();
    }

    create() {}
}