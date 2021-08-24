import { LoginApi } from '../api/login.api';

export class LoginController {
    loginAPI: LoginApi;
    constructor() {
        this.loginAPI = new LoginApi();
    }

    signIn(data: Record<string, unknown>) {
        return this.loginAPI.signIn(JSON.stringify(data));
    }

    logout() {
        return this.loginAPI.logout();
    }
}