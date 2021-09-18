import Handlebars from 'handlebars';
import Component from '../../components/component';
import { Button } from '../../components/button/index';
import { templateMarkup } from './profile.tpl';
import { LoginController } from '../../controllers/login.controller';
import { UserController } from '../../controllers/user.controller';
import { Router } from '../../utils/router/index';
import avatar from '/static/avatar.png';

const profileProps = {
    avatar,
    displayName: '',
    userData: [{
        label: 'Почта',
        value: 'dymm@email.com',
        name: 'email'
    }, {
        label: 'Логин',
        value: 'ivanovivan',
        name: 'login'
    }, {
        label: 'Имя',
        value: 'Иван',
        name: 'first_name'
    }, {
        label: 'Фамилия',
        value: 'Иванов',
        name: 'second_name'
    }, {
        label: 'Имя в чате',
        value: 'ivan',
        name: 'display_name'
    }, {
        label: 'Телефон',
        value: '+79999999999',
        name: 'phone'
    }],
    logoutButton: {
        text: 'Выйти',
        type: 'button',
        classes: 'button_small',
        action: 'logout'
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
                new Router().go('/');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    clickHandler(event:Event) {
        const target = event.target;
        const action = target.dataset.action;
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
            .then((response: string) => {
                try {
                    const userData = JSON.parse(response);
                    const actualData = this.userController.mapUserData(this.props.userData, userData);

                    this.props.displayName = userData.display_name;
                    this.props.userData = actualData;

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

        const buttonTarget: ChildNode | null = fragment.querySelector('[data-component-type="button"][data-component-name="logoutButton"]');
        if (buttonTarget !== null) {
            const button = new Button(this.props.logoutButton);
            buttonTarget.replaceWith(button.getContent() as Node);
        }

        return fragment.firstChild as HTMLElement;
    }
}