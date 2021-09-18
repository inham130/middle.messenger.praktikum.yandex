import { UserAPI } from '../api/user.api';

export class UserController {
    userAPI: UserAPI;

    constructor() {
        this.userAPI = new UserAPI();
    }

    getUserData(): Promise<unknown> {
        return this.userAPI.request();
    }

    saveUserData(data): Promise<unknown> {
        return this.userAPI.update(JSON.stringify(data));
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