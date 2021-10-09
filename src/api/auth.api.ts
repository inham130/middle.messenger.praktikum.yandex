import BaseAPI from './baseApi';

class AuthApi extends BaseAPI {
    constructor() {
        super('auth');
    }

    register(data): Promise<unknown> {
        return this.http.post('/signup', {data});
    }

    getUser(): Promise<unknown> {
        return this.http.get('/user');
    }
}

export default new AuthApi();