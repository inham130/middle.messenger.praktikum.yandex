import Component from '../../utils/component/component';
import { userInfoItem } from '../../components/user-info-item/';
import { Button, ButtonTypes } from '../../components/button/index';
import { templateMarkup } from './profile.tpl';
import { LoginController } from '../../controllers/login.controller';
import { UserController } from '../../controllers/user.controller';
import { Router } from '../../utils/router/index';
import PlainObject from '../../types/plainObject';
// @ts-ignore
import avatar from '../../../static/avatar.png';

const profileProps = {
    template: templateMarkup,
    avatar,
    displayName: '',
    children: {
        infoItems: [ new userInfoItem({
            label: 'Почта',
            value: 'dymm@email.com',
            name: 'email'
        }), new userInfoItem({
            label: 'Логин',
            value: 'ivanovivan',
            name: 'login'
        }), new userInfoItem({
            label: 'Имя',
            value: 'Иван',
            name: 'first_name'
        }), new userInfoItem({
            label: 'Фамилия',
            value: 'Иванов',
            name: 'second_name'
        }), new userInfoItem({
            label: 'Имя в чате',
            value: 'ivan',
            name: 'display_name'
        }), new userInfoItem({
            label: 'Телефон',
            value: '+79999999999',
            name: 'phone'
        })],
        logoutButton: new Button({
            text: 'Выйти',
            type: ButtonTypes.button,
            classes: 'button_small',
            action: 'logout'
        })
    },
    events: {
        click: function(event: Event) {
            this.clickHandler(event);
        }
    }
};

export class Profile extends Component {
    loginController: LoginController;
    userController: UserController;

    constructor(props = profileProps) {
        super(props);
    }

    logout() {
        this.loginController.logout()
            .then(() => {
                Router.go('/');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    clickHandler(event :Event) {
        const target = event.target;
        const action = (target as HTMLElement).dataset.action;
        if (action) {
            switch(action) {
                case 'logout':
                    this.logout();
                    break;
            }
        }
    }

    componentDidMount() {
        this.loginController = new LoginController();
        this.userController = new UserController();

        this.userController
            .getUserData()
            .then((userData: PlainObject) => {
                try {
                    this.userController.mapUserData(this.props.children.infoItems, userData);
                    this.props.displayName = userData.display_name;

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
}