import Handlebars from 'handlebars';
import { templateMarkup } from './login.tpl';
import '../../components/form/form';

const template = Handlebars.compile(templateMarkup);
const context = {
    form: {
        controls: [{
            label: 'Логин',
            name: 'login',
            type: 'text'
        }, {
            label: 'Пароль',
            name: 'password',
            type: 'password'
        }]
    }
};

export const html = template(context);