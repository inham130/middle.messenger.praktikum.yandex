import Handlebars from 'handlebars';
import Component from '../component';
import { ChatItem } from '../chatItem/index';
import { templateMarkup } from './chatList.tpl';

export class ChatLits extends Component {
    constructor(props) {
        super(props);
    }

    render(): HTMLElement {
        this.chats = [];
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        this.props.chats.forEach((item: Record<string, unknown>) => {
            const selector = `[data-component-type="chatItem"]`;
            const chat: HTMLElement | null = fragment.querySelector(selector);
            if (chat !== null) {
                const chatComponent: ChatItem = new ChatItem(item);
                this.chats.push(chatComponent);
                chat.replaceWith(chatComponent.getContent() as Node);
            }
        });

        return fragment.firstChild as HTMLElement;
    }
}