import Handlebars from 'handlebars';
import Component from '../../components/component';
import { Form } from '../../components/form';
import { templateMarkup } from './login.tpl';

const loginProps = {
    form: {
        name: "login",
        controls: [{
            label: 'Логин',
            name: 'login',
            type: 'text',
            events: {
                input: function(event) {
                    console.log(event.target.value);
                }
            }
        }, {
            label: 'Пароль',
            name: 'password',
            type: 'password',
            events: {
                input: function(event) {
                    console.log(event.target.value);
                }
            }
        }]
    }
};


export class Login extends Component {
    constructor(props = loginProps) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        const form = new Form(this.props.form);
        const formTarget: HTMLElement = fragment.querySelector('[data-component-name="form"]');
        formTarget.replaceWith(form.getContent());

        return fragment.firstChild;
    }
}