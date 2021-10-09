import AuthApi from '../api/auth.api';

export class SignUpController {
    constructor() {
        this.authApi = AuthApi;
    }

    signUp(data: Record<string, unknown>) {
        return this.authApi
            .create(JSON.stringify(data))
            .then(() => this.authApi.request());
    }
}