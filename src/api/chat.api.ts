import { BaseAPI } from './baseApi';
import HTTPTransport from '../utils/http/HTTPtransport';

export class ChatAPI extends BaseAPI {
    private http: HTTPTransport;
    private defaultHeaders = {'content-type': 'application/json'}

    constructor() {
        super();
        this.http = new HTTPTransport(this.host);
    }

    getChats() {
        const url = '/chats';
        const options = {headers: this.defaultHeaders};

        return this.http.get(url, options);
    }

    addChat(data) {
        const url = '/chats';
        const options = {data, headers: this.defaultHeaders};

        return this.http.post(url, options);
    }
}