import BaseAPI from './baseApi';
class UserAPI extends BaseAPI {
    constructor() {
        super('user');
    }

    updateUserData(data: string): Promise<unknown> {
        return this.http.put('/profile', {data});
    }

    changePassword(data: string): Promise<unknown> {
        return this.http.put('/password', {data});
    }

    uploadAvatar(data: string): Promise<unknown> {
        return this.http.put('/profile/avatar', {headers: null, data});
    }

    getUserId(data: string): Promise<unknown> {
        return this.http.post('/search', {data});
    }
}

export default new UserAPI();