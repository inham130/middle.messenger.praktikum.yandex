import BaseAPI from './baseApi';

class AuthApi extends BaseAPI {
    constructor() {
        super('auth');
    }

    register(data): Promise<unknown> {
        return this.http.post('/signup', {data});
    }

    request(): Promise<unknown> {
        return this.http.get('/user', {data});
    }
}

export default new AuthApi();