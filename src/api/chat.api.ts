import BaseAPI from './baseApi';

class ChatAPI extends BaseAPI {
    constructor() {
        super('chats');
    }

    getChats(): Promise<unknown> {
        return this.http.get('', {});
    }

    addChat(data): Promise<unknown> {
        return this.http.post('', {data});
    }

    addUser(data): Promise<unknown> {
        return this.http.put('/users', {data});
    }

    getUsers(id): Promise<unknown> {
        return this.http.get(`/${id}/users`, {});
    }

    getToken(id): Promise<unknown> {
        return this.http.post(`/token/${id}`, {});
    }
}

export default new ChatAPI();