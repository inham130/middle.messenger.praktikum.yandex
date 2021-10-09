import UserAPI from '../api/user.api';
import AuthApi from '../api/auth.api';
export class UserController {
    private userAPI = UserAPI;
    private authAPI = AuthApi;

    constructor() {}

    getUserData(): Promise<unknown> {
        return this.authAPI.getUser();
    }

    saveUserData(data): Promise<unknown> {
        return this.userAPI.updateUserData(JSON.stringify(data));
    }

    uploadAvatar(data) {
        return this.userAPI.uploadAvatar(data);
    }

    changePassword(data) {
        return this.userAPI.changePassword(JSON.stringify(data));
    }

    mapUserData(target: [], data: Record<string, unknown>): Array<Record<string, unknown>> {
        let value;
        return target.map((item) => {
            value = data[item.name] === null ? '' : data[item.name];
            item.value = value;
            return item;
        });
    }
}