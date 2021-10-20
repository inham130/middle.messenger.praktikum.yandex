import Component from '../../../utils/component/component';
import { Form } from '../../../components/form';
import { Input } from '../../../components/input';
import { Button, ButtonTypes } from '../../../components/button';
import { Popup } from '../../../components/popup/index';
import { UserController } from '../../../controllers/user.controller';
import { validation } from '../../../utils/validation/formValidation';
import PlainObject from '../../../types/plainObject';
import { notificationManagerMixin } from '../../../utils/mixin/notificationManagerMixin';
import { templateMarkup } from './profileEditData.tpl';
// @ts-ignore
import avatar from '../../../../static/avatar.png';

const editProfileProps = {
    template: templateMarkup,
    avatar,
    displayName: '',
    children: {
        form: new Form({
            classes: 'profile',
            name: 'editUserInfo',
            children: {
                controls: [new Input({
                    label: 'Почта',
                    name: 'email',
                    type: 'text',
                    controlId: 'email',
                    validationFunc: validation.email,
                    events: {
                        focus: function(event: Event) {
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
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
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
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
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
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
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
                        }
                    }
                }), new Input({
                    label: 'Имя в чате',
                    name: 'display_name',
                    type: 'text',
                    controlId: 'display_name'
                }), new Input({
                    label: 'Телефон',
                    name: 'phone',
                    type: 'text',
                    controlId: 'phone',
                    validationFunc: validation.phone,
                    events: {
                        focus: function(event: Event) {
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
                        },
                        blur: function(event: Event) {
                            this.props.validationFunc.call(this, (event.target as HTMLInputElement).value);
                        }
                    }
                })],
                button: new Button({
                    text: 'Сохранить',
                    type: ButtonTypes.submit
                }),
            },
            events: {
                submit: function(event: Event) {
                    this.submit(event);
                }
            }
        })
    },
    events: {
        click: function(event: Event) {
            this.clickHandler(event);
        }
    }
};

export class EditProfile extends Component {
    userController: UserController;
    popup: Popup;
    constructor(props = editProfileProps) {
        super(props);

        this.saveUserData = this.saveUserData.bind(this);
        this.submitPhoto = this.submitPhoto.bind(this);
    }

    registerCustomEvents(): void {
        this.element.addEventListener('formSubmit', this.saveUserData);
    }

    clickHandler(event: Event) {
        const target = event.target;
        const action = (target as HTMLInputElement).dataset.action;

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
            children: {
                form: new Form({
                    name: 'uploadPhoto',
                    children: {
                        controls: [new Input({
                            label: '',
                            name: 'avatar',
                            type: 'file',
                            controlId: 'avatar',
                            accept: ['.jpg', '.jpeg', '.png']
                        })],
                        button: new Button({
                            text: 'Загрузить',
                            type: ButtonTypes.submit
                        })
                    },
                    events: {
                        submit: this.submitPhoto
                    }
                })
            }
        };
        this.popup = new Popup(popupProps);
        this.element.appendChild(this.popup.element);
    }

    submitPhoto(event: Event) {
        event.preventDefault();
        const fileInput = (event.target as HTMLInputElement).querySelector('input[type="file"]');
        const [file] = (fileInput as any)?.files;
        const formData: FormData = new FormData();
        formData.append('avatar', file);

        this.userController
            .uploadAvatar(formData)
            .then((userData: PlainObject) => {
                try {
                    if (userData.avatar) {
                        const avatar = `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`;
                        this.setProps({...this.props, avatar});
                    }
                    this.popup.destroy();
                    // @ts-ignore
                    this.showHTTPSuccess();
                } catch(error) {
                    throw new Error(error);
                }
            })// @ts-ignore
            .catch(this.showHTTPError);
    }

    saveUserData(event: CustomEvent) {
        const formData = event.detail.formData;
        const data = Object.fromEntries(formData);
        this.userController.saveUserData(data)// @ts-ignore
            .then(() => this.showHTTPSuccess())// @ts-ignore
            .catch(this.showHTTPError);
    }

    componentDidMount() {
        this.userController = new UserController();

        this.userController
            .getUserData()
            .then((userData: PlainObject) => {
                try {
                    const { form } = this.props.children;
                    this.userController.mapUserData(form.props.children.controls, userData);
                    const displayName = userData.display_name;
                    const avatarToShow = userData.avatar ? `https://ya-praktikum.tech/api/v2/resources${userData.avatar}` : avatar;
                    this.setProps({...this.props, displayName, avatarToShow});
                } catch (error) {
                    throw new Error(error);
                }
            });
    }
}

Object.assign(EditProfile.prototype, notificationManagerMixin);