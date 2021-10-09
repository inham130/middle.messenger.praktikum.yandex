import BaseAPI from './baseApi';

class AuthApi extends BaseAPI {
    constructor() {
        super('auth');
    }

    create(data): Promise<unknown> {
        const url = '/signup';
        const options = {
            data,
            headers: {
                'content-type': 'application/json'
            }
        };
        return this.http.post(url, options);
    }

    request(): Promise<unknown> {
        const url = '/user';
        const options = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return this.http.get(url, options);
    }
}

export default new AuthApi();