import Handlebars from 'handlebars';
import Component from '../../../utils/component/component';
import { Form } from '../../../components/form';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { validation } from '../../../utils/validation/formValidation';
import { templateMarkup } from '../profile-edit-data/profileEditData.tpl';
import { UserController } from '../../../controllers/user.controller';
import { notificationManagerMixin } from '../../../utils/mixin/notificationManagerMixin';
import { NOTIFICATION_TYPES } from '../../../utils/mixin/notificationTypes';
import avatar from '/static/avatar.png';

const editPassProps = {
    avatar,
    displayName: '',
    children: {
        form: new Form({
            classes: 'profile',
            name: 'editUserInfo',
            children: {
                controls: [ new Input({
                    label: 'Пароль',
                    name: 'oldPassword',
                    type: 'password',
                    controlId: 'oldPassword',
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
                    label: 'Новый пароль',
                    name: 'newPassword',
                    type: 'password',
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
                }), new Input({
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
                })],
                button: new Button({
                    text: 'Сохранить',
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

export class EditPass extends Component {
    userController: UserController;
    constructor(props = editPassProps) {
        super(props);
    }

    registerCustomEvents(): void {
        this.element.addEventListener('formSubmit', (e: CustomEvent) => { this.changePassword(e); });
    }

    changePassword(event: CustomEvent): void {
        const formData = event.detail.formData;
        const data = Object.fromEntries(formData);

        if (data.newPasswordRepeat === data.newPassword) {
            this.userController.changePassword(data)
            .then(() => this.showHTTPSuccess())
            .catch(this.showHTTPError);
        } else {
            this.showNotification(NOTIFICATION_TYPES.ERROR, 'новые пароли не совпадают');
        }
    }

    componentDidMount() {
        this.userController = new UserController();

        this.userController
            .getUserData()
            .then((userData) => {
                try {
                    if (userData.avatar) {
                        const avatarSrc = `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`;
                        const img = document.querySelector('#profileAvatar');
                        img.setAttribute('src', avatarSrc);
                    }
                } catch (error) {
                    throw new Error(error);
                }
            });
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild as HTMLElement;
    }
}

Object.assign(EditPass.prototype, notificationManagerMixin);