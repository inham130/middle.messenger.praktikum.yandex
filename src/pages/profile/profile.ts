import Handlebars from 'handlebars';
import { templateMarkup } from './profile.tpl';
import avatar from '/static/avatar.png';

const context = {
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
const template = Handlebars.compile(templateMarkup);

export const html = template(context);