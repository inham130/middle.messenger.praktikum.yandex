import { LoginApi } from '../api/login.api';

export class LoginController {
    loginApi: LoginApi;
    constructor() {
        this.loginAPI = new LoginApi();
    }

    signIn(data: Record<string, unknown>) {
        return this.loginAPI.signIn(data);
    }

    logout() {
        return this.loginAPI.logout();
    }
}