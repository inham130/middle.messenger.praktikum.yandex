import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { templateMarkup } from './chatItem.tpl';
import avatar from '/static/avatar.png';

export class ChatItem extends Component {
    constructor(props) {
        super(props);
    }

    registerCustomEvents(): void {
        this.element.addEventListener('click', (event: Event) => {
            const customEvent = new CustomEvent('chatItemClick', {
                bubbles: true,
                detail: {id: this.props.id, title: this.props.title}
            });
            this.element.dispatchEvent(customEvent);
        });
    }

    componentDidMount() {
        if (this.props.avatar === null) {
            this.props.avatar = avatar;
        }
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild as HTMLElement;
    }
}