import BaseAPI from './baseApi';
class UserAPI extends BaseAPI {
    private http: HTTPTransport;

    constructor() {
        super('user');
    }

    updateUserData(data): Promise<unknown> {
        return this.http.put('/profile', {data});
    }

    changePassword(data): Promise<unknown> {
        return this.http.put('/password', {data});
    }

    uploadAvatar(data): Promise<unknown> {
        return this.http.put('/profile/avatar', {headers: null, data});
    }

    getUserId(data): Promise<unknown> {
        return this.http.post('/search', {data});
    }
}

export default new UserAPI();