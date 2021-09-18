import { SignUpApi } from '../../../api/auth.api';

export class SignUpController {
    signUpAPI: SignUpApi;
    constructor() {
        this.signUpAPI = new SignUpApi();
    }

    signUp(data: Record<string, unknown>) {
        return this.signUpAPI
            .create(JSON.stringify(data))
            .then(() => this.signUpAPI.request());
    }
}