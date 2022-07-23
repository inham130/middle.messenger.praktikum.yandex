import AuthApi from '../api/auth.api';

export class SignUpController {
    private authApi = AuthApi;
    constructor() {}

    signUp(data: Record<string, unknown>) {
        return this.authApi
            .register(JSON.stringify(data));
    }
}