import Handlebars from 'handlebars';
import { templateMarkup } from './login.tpl';
import { Form } from '../../components/form/index';

const template = Handlebars.compile(templateMarkup);
const formProps = {
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
const form = new Form(formProps);

export const html = template({form: form.render()});