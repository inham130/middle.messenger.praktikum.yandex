import UserAPI from '../api/user.api';
import AuthApi from '../api/auth.api';
import PlainObject from '../types/plainObject';
export class UserController {
    private userAPI = UserAPI;
    private authAPI = AuthApi;

    constructor() {}

    getUserData(): Promise<unknown> {
        return this.authAPI.getUser();
    }

    saveUserData(data: PlainObject): Promise<unknown> {
        return this.userAPI.updateUserData(JSON.stringify(data));
    }

    uploadAvatar(data: PlainObject) {
        return this.userAPI.uploadAvatar(data);
    }

    changePassword(data: PlainObject) {
        return this.userAPI.changePassword(JSON.stringify(data));
    }

    mapUserData(target: PlainObject[], data: Record<string, unknown>): void {
        let value;
        target.forEach((item) => {
            value = data[item.props.name] === null ? '' : data[item.props.name];
            item.props.value = value;
            return item;
        });
    }
}