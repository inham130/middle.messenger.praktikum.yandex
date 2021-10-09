import Handlebars from 'handlebars';
import Component from '../../../utils/component/component';
import { Form } from '../../../components/form';
import { Popup } from '../../../components/popup/index';
import { UserController } from '../../../controllers/user.controller';
import { validation } from '../../../utils/validation/formValidation';
import { notificationManagerMixin } from '../../../utils/mixin/notificationManagerMixin';
import { templateMarkup } from './profileEditData.tpl';
import avatar from '/static/avatar.png';

const editProfileProps = {
    avatar,
    displayName: '',
    form: {
        classes: 'profile',
        name: 'editUserInfo',
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
            label: 'Имя в чате',
            value: '',
            name: 'display_name',
            type: 'text',
            controlId: 'display_name'
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
        }],
        button: {
            text: 'Сохранить',
            type: 'submit'
        },
        events: {
            submit: function(event: Event) {
                this.submit(event);
            }
        }
    },
    events: {
        click: function(event: Event) {
            this.clickHandler(event);
        }
    }
};

export class EditProfile extends Component {
    userController: UserController;
    constructor(props = editProfileProps) {
        super(props);

        this.saveUserData = this.saveUserData.bind(this);
        this.submitPhoto = this.submitPhoto.bind(this);
    }

    registerCustomEvents(): void {
        this.element.addEventListener('formSubmit', this.saveUserData);
    }

    clickHandler(event:Event) {
        const target = event.target;
        const action = target.dataset.action;

        if (action) {
            switch(action) {
                case 'uploadPhoto':
                    this.uploadPhoto();
                    break;
            }
        }
    }

    uploadPhoto() {
        const popupProps = {
            title: 'Загрузите файл',
            form: {
                name: 'uploadPhoto',
                controls: [{
                    label: '',
                    name: 'avatar',
                    type: 'file',
                    controlId: 'avatar',
                    accept: ['.jpg', '.jpeg', '.png']
                }],
                button: {
                    text: 'Загрузить',
                    type: 'submit'
                },
                events: {
                    submit: this.submitPhoto
                }
            }
        };
        this.popup = new Popup(popupProps);
        this.element.appendChild(this.popup.element);
    }

    submitPhoto(event: Event) {
        event.preventDefault();
        const fileInput = event.target.querySelector('input[type="file"]');
        const [file] = fileInput.files;
        const formData: FormData = new FormData();
        const me = this;
        formData.append('avatar', file);

        this.userController
            .uploadAvatar(formData)
            .then((userData) => {
                try {
                    if (userData.avatar) {
                        this.renderAvatar(userData.avatar);
                    }
                    me.popup.destroy();
                    me.showHTTPSuccess();
                } catch(error) {
                    throw new Error(error);
                }
            })
            .catch(this.showHTTPError);
    }

    saveUserData(event: CustomEvent) {
        const formData = event.detail.formData;
        const data = Object.fromEntries(formData);
        this.userController.saveUserData(data)
            .then(() => this.showHTTPSuccess())
            .catch(this.showHTTPError);
    }

    componentDidMount() {
        this.userController = new UserController();

        this.userController
            .getUserData()
            .then((userData: string) => {
                try {
                    const actualData = this.userController.mapUserData(this.props.form.controls, userData);

                    this.props.displayName = userData.display_name;
                    this.props.userData = actualData;
                    if (userData.avatar) {
                        this.renderAvatar(userData.avatar);
                    }
                } catch (error) {
                    throw new Error(error);
                }
            });
    }

    renderAvatar(fileName) {
        const avatarSrc = `https://ya-praktikum.tech/api/v2/resources${fileName}`;
        const img = document.querySelector('#profileAvatar');
        img.setAttribute('src', avatarSrc);
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

Object.assign(EditProfile.prototype, notificationManagerMixin);