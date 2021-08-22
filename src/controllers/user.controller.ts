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
        return this.userAPI.update(data):
    }

    mapnUserData(target: [], data: Record<string, unknown>): Array<Record<string, unknown>> {
        let value;
        return target.map((item) => {
            value = data[item.name] === null ? '' : data[item.name];
            item.value = value;
            return item;
        });
    }
}