import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { templateMarkup } from './userInfoItem.tpl';


export class userInfoItem extends Component {
    constructor(props) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild as HTMLElement;
    }
}