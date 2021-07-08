import Handlebars from "handlebars";
import { templateMarkup } from "./signup.tpl";

const context = {
    form: {
        controls: [{
            label: 'Почта',
            name: 'email',
            type: 'text'
        }, {
            label: 'Логин',
            name: 'login',
            type: 'text'
        }, {
            label: 'Имя',
            name: 'first_name',
            type: 'text'
        }, {
            label: 'Фамилия',
            name: 'second_name',
            type: 'text'
        }, {
            label: 'Телефон',
            name: 'phone',
            type: 'text'
        }, {
            label: 'Пароль',
            name: 'password',
            type: 'password'
        }, {
            label: 'Пароль еще раз',
            name: 'password',
            type: 'password'
        }]
    }
}
const template = Handlebars.compile(templateMarkup);

export const html = template(context);