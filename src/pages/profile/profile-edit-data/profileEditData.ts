import Handlebars from 'handlebars';
import Component from '../../../components/component';
import { Form } from '../../../components/form';
import { validation } from '../../../utils/formValidation';
import { templateMarkup } from './profileEditData.tpl';
import avatar from '/static/avatar.png'

const editProfileProps = {
    avatar,
    userName: 'Иван',
    form: {
        classes: 'profile',
        profileTitle: 'Иван',
        name: "editUserInfo",
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
        }],
        hiddenFields: [{
            name: 'avatar',
            type: 'file',
            hidden: true
        }],
        button: {
            text: 'Сохранить',
            events: {
                click: function(event: Event) {
                    event.preventDefault();
                    const form: HTMLFormElement | null = document.querySelector('form[name="editUserInfo"]');
                    if (form !== null) {
                        const formData: FormData = new FormData(form);
                        console.log(Object.fromEntries(formData));    
                    }
                }
            }
        }
    }
}

export class EditProfile extends Component {
    constructor(props = editProfileProps) {
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