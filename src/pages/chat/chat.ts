import Handlebars from 'handlebars';
import Component from '../../components/component';
import { templateMarkup } from './chat.tpl';
import avatar from '/static/avatar.png';

export class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));


        // const formTarget: HTMLElement | null = fragment.querySelector('[data-component-type="form"]');
        // if (formTarget !== null) {
        //     const form = new Form(this.props.form);
        //     formTarget.replaceWith(form.getContent());
        // }

        return fragment.firstChild;
    }
}