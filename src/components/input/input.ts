import Handlebars from 'handlebars';
import Component from '../component';
import { templateMarkup } from './input.tpl';

export class Input extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));
        
        return fragment.firstChild;
    }
}