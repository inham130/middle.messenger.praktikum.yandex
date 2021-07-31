import Handlebars from 'handlebars';
import Component from '../../components/component';
import { Form } from '../../components/form';
import { Button } from '../../components/button';
import { validation } from '../../utils/formValidation';
import { templateMarkup } from './login.tpl';

function validateLenght(event: Event) {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 15;
    const value = event.target.value;
    let isValid = false;

    if (value.length >= MIN_LENGTH && value.length <= MAX_LENGTH) {
        isValid = true;
    }

    this.updateValidity(isValid);
}

const loginProps = {
    form: {
        name: 'login',
        controls: [{
            label: 'Логин',
            name: 'login',
            type: 'text',
            events: {
                focus: validation.login,
                blur: validation.login,
            }
        }, {
            label: 'Пароль',
            name: 'password',
            type: 'password',
            events: {
                focus: validation.password,
                blur: validation.password,
            }
        }],
        button: {
            text: 'Авторизоваться',
            events: {
                click: function() {
                    const form: HTMLFormElement | null = document.querySelector('form[name="signUp"]');
                    if (form !== null) {
                        const formData: FormData = new FormData(form);
                        console.log(Object.fromEntries(formData));
                    }
                }
            }
        }
    }
};


export class Login extends Component {
    constructor(props = loginProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        const formTarget: HTMLElement | null = fragment.querySelector('[data-component-type="form"]');
        if (formTarget !== null) {
            const form = new Form(this.props.form);
            formTarget.replaceWith(form.getContent());
        }

        const buttonTarget: HTMLElement | null = fragment.querySelector('[data-component-type="button"]');
        if (buttonTarget !== null) {
            const button = new Button(this.props.button);
            buttonTarget.replaceWith(button.getContent());
        }

        return fragment.firstChild;
    }
}