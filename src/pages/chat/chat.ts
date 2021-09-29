import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { ChatSideBar } from 'components/chat-side-bar';
import { ChatController } from '~/src/controllers/chat.controller';
import { Popup } from 'components/popup';
import { templateMarkup } from './chat.tpl';
import avatar from '/static/avatar.png';

type chatProps = Record<string, unknown>
const chatProps = {
    chatSideBar: {
        avatar,
        button: {
            text: 'Добавить чат',
            type: 'button',
            classes: 'button_small',
            action: 'addChatPopup'
        },
        chatList: {
            chats: []
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

    registerCustomEvents(): void {
        this.element.addEventListener('chatItemClick', (e: Event) => this.selectChat(e));
    }

    selectChat(event: Event) {
        const {id, title: chatTitle} = event.detail;
        this.props.chatTitle = chatTitle;
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
            .then((response) => {
                const {id} = JSON.parse(response);
                const newProps = Object.assign({}, this.props);
                newProps.chatSideBar.chatList.chats.unshift({id, title: userLoginInput.value, avatar: null});
                this.setProps(newProps);
                me.popup.destroy();
            });
    }

    componentDidMount() {
        this.chatController = new ChatController();

        this.chatController.getChats()
            .then((response: string) => {
                const chats = JSON.parse(response);
                const newProps = Object.assign({}, this.props);
                newProps.chatSideBar.chatList.chats = chats;
                this.setProps(newProps);
            });
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