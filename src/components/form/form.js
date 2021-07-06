import { templateMarkup } from "./form.tpl";
import Handlebars from "handlebars";

export class Form {
    constructor() {
        this.templateMarkup = templateMarkup;
        Handlebars.registerPartial('form', this.templateMarkup);
    }
}