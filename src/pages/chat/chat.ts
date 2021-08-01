import Handlebars from 'handlebars';
import Component from '../../components/component';
import { templateMarkup } from './chat.tpl';

type chatProps = Record<string, unknown>
export class Chat extends Component {
    constructor(props: chatProps) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild as HTMLElement;
    }
}