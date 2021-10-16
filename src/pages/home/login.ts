import Component from '../../utils/component/component';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { validation } from '../../utils/validation/formValidation';
import { notificationManagerMixin } from '../../utils/mixin/notificationManagerMixin';
import { LoginController } from '../../controllers/login.controller';
import { Router } from '../../utils/router/index';
import { templateMarkup } from './login.tpl';

const loginProps = {
    template: templateMarkup,
    children: {
        form: new Form({
            name: 'login',
            children: {
                controls: [new Input({
                    label: 'Логин',
                    name: 'login',
                    type: 'text',
                    controlId: 'login',
                    validationFunc: validation.login,
                    events: {
                        focus: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        }
                    }
                }), new Input({
                    label: 'Пароль',
                    name: 'password',
                    type: 'password',
                    controlId: 'password',
                    validationFunc: validation.password,
                    events: {
                        focus: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        }
                    }
                })],
                button: new Button({
                    text: 'Авторизоваться',
                    type: 'submit',
                })
            },
            events: {
                submit: function(event: Event) {
                    this.submit(event);
                }
            }
        })
    }
};

export class Login extends Component {
    loginController: LoginController;

    constructor(props = loginProps) {
        super(props);

        this.loginController = new LoginController();
    }

    registerCustomEvents(): void {
        this.element.addEventListener('formSubmit', (e: CustomEvent) => this.signIn(e));
    }

    signIn(event: CustomEvent) {
        const formData = event.detail.formData;
        const data = Object.fromEntries(formData);
        this.loginController.signIn(data)
            .then(() => {
                Router.go('/profile');
            })
            .catch(this.showHTTPError);
    }
}

Object.assign(Login.prototype, notificationManagerMixin);