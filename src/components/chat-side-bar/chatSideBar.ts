import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { ChatList } from '~/src/components/chat-list/index';
import { Button } from '~/src/components/button/index';
import { ChatItem } from '../../components/chat-item/chatItem';
import { ChatController } from '~/src/controllers/chat.controller';
import { templateMarkup } from './chatSideBar.tpl';

export class ChatSideBar extends Component {
    constructor(props) {
        super(props);
    }

    /* componentDidMount() {
        this.chatController = new ChatController();

        this.chatController.getChats()
            .then((chats) => {
                const newProps = Object.assign({}, this.props);
                const.chatList = []
                chats.forEach(chat => {
                    const chatItem = new ChatItem(chat);
                    chatList.push(chatItem);
                    // newProps.children.chatSideBar.props.children.chatList.chats.push(chatItem);
                });
                // newProps.children.chatSideBar.props.children.chatList.props.children.chats = chatList;
                console.log(newProps);
                newProps.children.chatList.props.children.chats = chatList;
                debugger;
                // this.props.children.chatSideBar.props.children.chatList.setProps({
                //     children: {chats: chatList}
                // })
                this.setProps(newProps);
            });
    } */

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        /* const buttonTarget: ChildNode | null = fragment.querySelector('[data-component-type="button"]');
        if (buttonTarget !== null) {
            const button = new Button(this.props.button);
            buttonTarget.replaceWith(button.getContent() as Node);
        }

        const chatListTarget: ChildNode | null = fragment.querySelector('[data-component-type="chatList"]');
        if (chatListTarget !== null) {
            const chatList = new ChatList(this.props.chatList);
            chatListTarget.replaceWith(chatList.getContent() as Node);
        } */

        return fragment.firstChild as HTMLElement;
    }
}