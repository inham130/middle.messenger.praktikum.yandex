import HTTPTransport from '../utils/http/HTTPtransport';
export default class BaseAPI {
    protected http: HTTPTransport;

    constructor(endpoint: string) {
        this.http = new HTTPTransport(`https://ya-praktikum.tech/api/v2/${endpoint}`);
    }
}