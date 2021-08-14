import Handlebars from 'handlebars';
import Component from '../../components/component';
import { templateMarkup } from './profile.tpl';
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
    }
};

export class Profile extends Component {
    constructor(props = profileProps) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild as HTMLElement;
    }
}