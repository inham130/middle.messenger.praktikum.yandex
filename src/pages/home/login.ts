import Handlebars from 'handlebars';
import Component from '../../components/component';
import { Form } from '../../components/form';
import { Button } from '../../components/button';
import { validation } from '../../utils/formValidation';
import { LoginController } from '../../controllers/login.controller';
import { Router } from '../../utils/router/index';
import { templateMarkup } from './login.tpl';

const loginProps = {
    form: {
        name: 'login',
        controls: [{
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
        }, {
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
        }],
        button: {
            text: 'Авторизоваться',
            type: 'submit',
        },
        events: {
            submit: function(event: Event) {
                this.submit(event);
            }
        }
    }
};


export class Login extends Component {
    constructor(props = loginProps) {
        super(props);

        this.loginController = new LoginController();
        this.signIn = this.signIn.bind(this);
        this.registerCustomEvents();
    }

    registerCustomEvents(): void {
        this.element.addEventListener('formSubmit', this.signIn);
    }

    signIn(event: CustomEvent) {
        const formData = event.detail.formData;
        const data = Object.fromEntries(formData);
        this.loginController
            .signIn(data)
            .then((response) => {
                new Router().go('/profile');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        const formTarget: HTMLElement | null = fragment.querySelector('[data-component-type="form"]');
        if (formTarget !== null) {
            const form = new Form(this.props.form);
            formTarget.replaceWith(form.getContent() as Node);
        }

        const buttonTarget: HTMLElement | null = fragment.querySelector('[data-component-type="button"]');
        if (buttonTarget !== null) {
            const button = new Button(this.props.button);
            buttonTarget.replaceWith(button.getContent() as Node);
        }

        return fragment.firstChild as HTMLElement;
    }

    componentDidMount(): void {}
}