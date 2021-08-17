import { SignUpApi } from './signup.api';

export class SignUpController {
    signUpAPI: SignUpApi;
    constructor() {
        this.signUpAPI = new SignUpApi;
    }

    signUp(data: Record<string, unknown>) {
        this.signUpAPI.create(data);
    }
}