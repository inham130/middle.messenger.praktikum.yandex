import { SignUpApi } from '../../../api/auth.api';

export class SignUpController {
    signUpAPI: SignUpApi;
    constructor() {
        this.signUpAPI = new SignUpApi();
    }

    signUp(data: Record<string, unknown>) {
        return this.signUpAPI
            .create(data)
            .then((response) => {
                if (response.status !== 200) {
                    console.error(response);
                }
            })
            .then(() => {
                this.signUpAPI
                    .request()
                    .then((response) => {
                        console.log(response);
                    });
            });
    }
}