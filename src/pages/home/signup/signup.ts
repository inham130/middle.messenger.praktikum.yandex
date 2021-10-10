import Handlebars from 'handlebars';
import Component from '../../../utils/component/component';
import { Form } from '../../../components/form';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { SignUpController } from '../../../controllers/signup.controller';
import { validation } from '../../../utils/validation/formValidation';
import { notificationManagerMixin } from '../../../utils/mixin/notificationManagerMixin';
import { templateMarkup } from './signup.tpl';
import { Router } from '../../../utils/router/index';

const signUpProps = {
    children: {
        form: new Form({
            name: 'signUp',
            children: {
                controls: [new Input({
                    label: 'Почта',
                    name: 'email',
                    type: 'text',
                    controlId: 'email',
                    validationFunc: validation.email,
                    events: {
                        focus: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        }
                    }
                }), new Input({
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
                    label: 'Имя',
                    name: 'first_name',
                    type: 'text',
                    controlId: 'first_name',
                    validationFunc: validation.name,
                    events: {
                        focus: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        }
                    }
                }), new Input({
                    label: 'Фамилия',
                    name: 'second_name',
                    type: 'text',
                    controlId: 'second_name',
                    validationFunc: validation.name,
                    events: {
                        focus: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, event.target.value);
                        }
                    }
                }), new Input({
                    label: 'Телефон',
                    name: 'phone',
                    type: 'text',
                    controlId: 'phone',
                    validationFunc: validation.phone,
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
                }), new Input({
                    label: 'Пароль еще раз',
                    name: 'confirmPassword',
                    type: 'password',
                    controlId: 'confirmPassword',
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
                    text: 'Зарегистрироваться',
                    type: 'submit'
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

export class SignUp extends Component {
    showHTTPError: CallableFunction;
    private signUpController: SignUpController;

    constructor(props = signUpProps, controller = SignUpController) {
        super(props);
        this.signUpController = new SignUpController();
    }

    registerCustomEvents(): void {
        this.element.addEventListener('formSubmit', (e: CustomEvent) => this.signUp(e));
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild;
    }

    signUp(event: CustomEvent) {
        const formData = event.detail.formData;
        const data = Object.fromEntries(formData);
        this.signUpController
            .signUp(data)
            .then(() => {
                // поскольку Router является синглтоном я использую new, но не уверен, что это хорошо
                new Router().go('/messenger');
            })
            .catch(this.showHTTPError);
    }
}

Object.assign(SignUp.prototype, notificationManagerMixin);