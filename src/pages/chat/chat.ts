import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { ChatSideBar } from 'components/chat-side-bar';
import { ChatController } from '~/src/controllers/chat.controller';
import { Popup } from 'components/popup';
import { templateMarkup } from './chat.tpl';

type chatProps = Record<string, unknown>
const chatProps = {
    chatSideBar: {
        button: {
            text: 'Добавить чат',
            type: 'button',
            classes: 'button_small',
            action: 'addChatPopup'
        },
        chatList: {
            chats: [{
                chatName: 'chat name',
                chatPreview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem earum soluta accusamus, obcaecati molestias, libero tempora in debitis voluptates rem provident qui.',
                lastDate: '10:14',
                unreadCount: 4
            }]
        }
    },
    events: {
        click: function(event: Event) {
            this.clickHandler(event);
        }
    }
};
export class Chat extends Component {
    chatController: ChatController;
    constructor(props: chatProps = chatProps) {
        super(props);

        this.submitChat = this.submitChat.bind(this);
    }

    clickHandler(event:Event) {
        const target = event.target;
        const action = target.dataset.action;

        if (action) {
            switch(action) {
                case 'addChatPopup':
                    this.addChatPopup();
                    break;
                default:
                    console.log('Unknown action');
            }
        }
    }

    addChatPopup() {
        const popupProps = {
            title: 'Название чата',
            form: {
                name: 'addChat',
                controls: [{
                    label: '',
                    name: 'userLogin',
                    type: 'text',
                    controlId: 'userLogin'
                }],
                button: {
                    text: 'Добавить',
                    type: 'submit'
                },
                events: {
                    submit: this.submitChat
                }
            }
        };
        this.popup = new Popup(popupProps);
        this.element.appendChild(this.popup.element);
    }

    submitChat(event: Event) {
        event.preventDefault();
        this.chatController = new ChatController();
        const userLoginInput = event.target.querySelector('#userLogin');
        const me = this;

        this.chatController
            .addChat({title: userLoginInput.value})
            .then(() => me.popup.destroy());
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        const chatSideBarTarget: ChildNode | null = fragment.querySelector('[data-component-type="chatSideBar"]');
        if (chatSideBarTarget !== null) {
            const chatSideBar = new ChatSideBar(this.props.chatSideBar);
            chatSideBarTarget.replaceWith(chatSideBar.getContent() as Node);
        }

        return fragment.firstChild as HTMLElement;
    }
}