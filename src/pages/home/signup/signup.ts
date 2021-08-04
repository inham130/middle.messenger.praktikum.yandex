import Handlebars from 'handlebars';
import Component from '../../../components/component';
import { Form } from '../../../components/form';
import { validation } from '../../../utils/formValidation';
import { templateMarkup } from './signup.tpl';

const signUpProps = {
    form: {
        name: 'signUp',
        controls: [{
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
        }, {
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
        }, {
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
        }, {
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
        }, {
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
        }],
        button: {
            text: 'Зарегистрироваться',
            type: 'submit'
        },
        events: {
            submit: function(event: Event) {
                event.preventDefault();
                const form: HTMLFormElement | null = document.querySelector('form[name="signUp"]');
                const isFormValid = this.validateForm();

                if (!isFormValid) {
                    event.preventDefault();
                }

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

        return fragment.firstChild;
    }
}