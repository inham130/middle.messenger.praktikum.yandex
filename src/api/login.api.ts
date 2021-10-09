import BaseAPI from './baseApi';

class LoginApi extends BaseAPI {
    constructor() {
        super('auth');
    }

    signIn(data): Promise<unknown> {
        return this.http.post('/signin', {data});
    }

    logout(): Promise<unknown> {
        return this.http.post('/logout', {});
    }
}

export default new LoginApi();