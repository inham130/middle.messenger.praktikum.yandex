import Handlebars from 'handlebars';
import Component from '../../../components/component';
import { Form } from '../../../components/form';
import { Button } from '../../../components/button'
import { validation } from '../../../utils/formValidation'
import { templateMarkup } from './signup.tpl';

const signUpProps = {
    form: {
        name: "signUp",
        controls: [{
            label: 'Почта',
            name: 'email',
            type: 'text',
            events: {
                focus: validation.email,
                blur: validation.email
            }
        }, {
            label: 'Логин',
            name: 'login',
            type: 'text',
            events: {
                focus: validation.login,
                blur: validation.login
            }
        }, {
            label: 'Имя',
            name: 'first_name',
            type: 'text',
            events: {
                focus: validation.name,
                blur: validation.name
            }
        }, {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text',
            events: {
                focus: validation.name,
                blur: validation.name
            }
        }, {
            label: 'Телефон',
            name: 'phone',
            type: 'text',
            events: {
                focus: validation.phone,
                blur: validation.phone
            }
        }, {
            label: 'Пароль',
            name: 'password',
            type: 'password',
            events: {
                focus: validation.password,
                blur: validation.password
            }
        }, {
            label: 'Пароль еще раз',
            name: 'password',
            type: 'password',
            events: {
                focus: validation.password,
                blur: validation.password
            }
        }]
    },
    button: {
        text: 'Зарегистрироваться',
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
};

export class SignUp extends Component {
    constructor(props = signUpProps) {
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
            buttonTarget.replaceWith(button.getContent())
        }

        return fragment.firstChild;
    }
}