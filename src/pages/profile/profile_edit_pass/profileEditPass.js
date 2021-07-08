import Handlebars from "handlebars";
import { templateMarkup } from "../profile_edit_data/profileEditData.tpl";
import avatar from '/static/avatar.png'

const context = {
    avatar,
    profile: {
        listData: [{
            label: 'Старый пароль',
            value: '',
            name: 'oldPassword',
            type: 'password'
        }, {
            label: 'Новый пароль',
            value: '',
            name: 'newPassword',
            type: 'password'
        }, {
            label: 'Повторите новый пароль',
            value: '',
            name: 'newPasswordRepeat',
            type: 'password'
        }]
    }
}
const template = Handlebars.compile(templateMarkup);

export const html = template(context);