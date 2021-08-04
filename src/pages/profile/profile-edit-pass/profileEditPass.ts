import Handlebars from 'handlebars';
import Component from '../../../components/component';
import { Form } from '../../../components/form';
import { validation } from '../../../utils/formValidation';
import { templateMarkup } from '../profile-edit-data/profileEditData.tpl';
import avatar from '/static/avatar.png';

const editPassProps = {
    avatar,
    userName: 'Иван',
    form: {
        classes: 'profile',
        profileTitle: 'Иван',
        name: 'editUserInfo',
        controls: [{
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
            name: 'newPassword',
            type: 'newPassword',
            controlId: 'newPassword',
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
            label: 'Повторите новый пароль',
            value: '',
            name: 'newPasswordRepeat',
            type: 'password',
            controlId: 'newPasswordRepeat',
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
            text: 'Сохранить',
            type: 'submit'
        },
        events: {
            submit: function(event: Event) {
                event.preventDefault();
                const form: HTMLFormElement | null = document.querySelector('form[name="editUserInfo"]');
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

export class EditPass extends Component {
    constructor(props = editPassProps) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        const formTarget: HTMLElement | null = fragment.querySelector('[data-component-type="form"]');
        if (formTarget !== null) {
            const form = new Form(this.props.form);
            formTarget.replaceWith(form.getContent() as Node);
        }

        return fragment.firstChild as HTMLElement;
    }
}