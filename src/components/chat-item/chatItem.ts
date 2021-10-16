import Component from '../../utils/component/component';
import { templateMarkup } from './chatItem.tpl';
import avatar from '/static/avatar.png';

export class ChatItem extends Component {
    constructor(props) {
        props.template = templateMarkup;
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
}