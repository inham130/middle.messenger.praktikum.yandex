import Handlebars from 'handlebars';
import Component from '../../components/component';
import { Button } from '../../components/button/index';
import { templateMarkup } from './profile.tpl';
import { LoginController } from '../../controllers/login.controller';
import { Router } from '../../utils/router/index';
import avatar from '/static/avatar.png';

const profileProps = {
    avatar,
    profile: {
        listData: [{
            label: 'Почта',
            value: 'dymm@email.com'
        }, {
            label: 'Логин',
            value: 'ivanovivan'
        }, {
            label: 'Имя',
            value: 'Иван'
        }, {
            label: 'Фамилия',
            value: 'Иванов'
        }, {
            label: 'Имя в чате',
            value: 'ivan'
        }, {
            label: 'Телефон',
            value: '+79999999999'
        }]
    },
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
    constructor(props = profileProps) {
        super(props);

        this.loginController = new LoginController();
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

    logout() {
        this.loginController.logout()
            .then(() => {
                new Router().go('/');
            })
            .catch((error) => {
                console.log(error);
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