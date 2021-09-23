import Handlebars from 'handlebars';
import Component from '../component';
import { templateMarkup } from './chatItem.tpl';

export class ChatItem extends Component {
    constructor(props) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild as HTMLElement;
    }
}