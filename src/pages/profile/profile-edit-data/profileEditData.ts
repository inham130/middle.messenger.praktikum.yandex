import Handlebars from 'handlebars';
import { templateMarkup } from './profileEditData.tpl';
import avatar from '/static/avatar.png'

const context = {
    avatar,
    profile: {
        listData: [{
            label: 'Почта',
            value: 'dymm@email.com',
            name: 'email',
            type: 'text'
        }, {
            label: 'Логин',
            value: 'ivanovivan',
            name: 'login',
            type: 'text'
        }, {
            label: 'Имя',
            value: 'Иван',
            name: 'first_name',
            type: 'text'
        }, {
            label: 'Фамилия',
            value: 'Иванов',
            name: 'emasecond_nameil',
            type: 'text'
        }, {
            label: 'Имя в чате',
            value: 'ivan',
            name: 'display_name',
            type: 'text'
        }, {
            label: 'Телефон',
            value: '+79999999999',
            name: 'phone',
            type: 'text'
        }]
    }
}
const template = Handlebars.compile(templateMarkup);

export const html = template(context);