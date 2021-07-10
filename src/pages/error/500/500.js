import Handlebars from 'handlebars';
import { templateMarkup } from '../error.tpl';

const context = {
    title: '500',
    message: 'Мы уже фиксим',
    linktTitle: 'Назад к чатам'
}
const template = Handlebars.compile(templateMarkup);

export const html = template(context);