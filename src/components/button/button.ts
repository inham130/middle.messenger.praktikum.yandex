import Handlebars from 'handlebars';
import Component from '../component';
import { templateMarkup } from './button.tpl';

type buttonProps = {
    text: string,
    events?: {},
    settings?: {}
}

export class Button extends Component {
    props: buttonProps;

    constructor(props: buttonProps) {
        super(props);
    }

    render() {

        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild;
    }
}