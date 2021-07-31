import Handlebars from 'handlebars';
import { templateMarkup } from '../error.tpl';

const context = {
    title: '404',
    message: 'Не туда попали',
    linktTitle: 'Назад к чатам'
};
const template = Handlebars.compile(templateMarkup);

export const html = template(context);