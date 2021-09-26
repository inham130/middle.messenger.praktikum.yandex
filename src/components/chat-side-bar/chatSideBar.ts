import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { ChatList } from '~/src/components/chat-list/index';
import { Button } from '~/src/components/button/index';
import { templateMarkup } from './chatSideBar.tpl';

export class ChatSideBar extends Component {
    constructor(props) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        const buttonTarget: ChildNode | null = fragment.querySelector('[data-component-type="button"]');
        if (buttonTarget !== null) {
            const button = new Button(this.props.button);
            buttonTarget.replaceWith(button.getContent() as Node);
        }

        const chatListTarget: ChildNode | null = fragment.querySelector('[data-component-type="chatList"]');
        if (chatListTarget !== null) {
            const chatList = new ChatList(this.props.chatList);
            chatListTarget.replaceWith(chatList.getContent() as Node);
        }

        return fragment.firstChild as HTMLElement;
    }
}