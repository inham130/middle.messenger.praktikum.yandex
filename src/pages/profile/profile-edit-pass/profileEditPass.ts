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
        controls: [, {
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
        }, {
            label: 'Повторите новый пароль',
            value: '',
            name: 'newPasswordRepeat',
            type: 'password',
            events: {
                focus: validation.password,
                blur: validation.password
            }
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
};

export class EditPass extends Component {
    constructor(props = editPassProps) {
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