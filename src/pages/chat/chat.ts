import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { ChatLits } from '../../components/chatList';
import { templateMarkup } from './chat.tpl';

type chatProps = Record<string, unknown>
const chatProps = {
    chatList: {
        chats: [{
            chatName: 'chat name',
            chatPreview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem earum soluta accusamus, obcaecati molestias, libero tempora in debitis voluptates rem provident qui.',
            lastDate: '10:14',
            unreadCount: 4
        }, {
            chatName: 'chat name2',
            chatPreview: 'Autem earum soluta accusamus, obcaecati molestias, libero tempora in debitis voluptates rem provident qui.',
            lastDate: '11:14',
            unreadCount: 0
        }]
    }
};
export class Chat extends Component {
    constructor(props: chatProps = chatProps) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        console.log(this.props);

        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        const chatListTarget: ChildNode | null = fragment.querySelector('[data-component-type="chatList"]');
        if (chatListTarget !== null) {
            const chatList = new ChatLits(this.props.chatList);
            chatListTarget.replaceWith(chatList.getContent() as Node);
        }

        return fragment.firstChild as HTMLElement;
    }
}