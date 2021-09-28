import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { ChatItem } from '../chat-item/index';
import { ChatController } from '../../controllers/chat.controller';
import { templateMarkup } from './chatList.tpl';

export class ChatList extends Component {
    chatController: ChatController;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.chatController = new ChatController();

        this.chatController.getChats()
            .then((response: string) => {
                const chats = JSON.parse(response);
                this.props.chats = chats;
            });
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