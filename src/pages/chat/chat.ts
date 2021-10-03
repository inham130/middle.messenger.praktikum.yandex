import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { ChatSideBar } from 'components/chat-side-bar';
import { ChatController } from '~/src/controllers/chat.controller';
import { Popup } from 'components/popup';
import { templateMarkup } from './chat.tpl';
import avatar from '/static/avatar.png';
import { UserController } from '~/src/controllers/user.controller';

type chatProps = Record<string, unknown>
const chatProps = {
    activeChatId: null,
    userId: null,
    messages: [],
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
    socket: WebSocket;
    constructor(props: chatProps = chatProps) {
        super(props);

        this.submitChat = this.submitChat.bind(this);
        this.addUser = this.addUser.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    registerCustomEvents(): void {
        this.element.addEventListener('chatItemClick', (e: Event) => this.selectChat(e));
    }

    selectChat(event: Event) {
        const {id, title: chatTitle} = event.detail;
        this.props.chatTitle = chatTitle;
        this.props.activeChatId = id;

        const connectionConfig = {userId: this.props.userId, chatId: id};
        this.chatController.setUpConnection(connectionConfig)
            .then((socket: WebSocket) => {
                this.socket = socket;

                this.socket.addEventListener('open', () => {
                    socket.send(JSON.stringify({
                        content: '0',
                        type: 'get old',
                    }));
                });

                this.socket.addEventListener('message', (event: Event) => {
                    const data = JSON.parse(event.data);
                    let messages = [];

                    if (!Array.isArray(data) && data.type !== 'message') {
                        return;
                    }

                    if (Array.isArray(data)) {
                        messages = data.reverse();
                    } else {
                        messages = [...this.props.messages, data];
                    }

                    messages.forEach((item) => {
                        item.incoming = item.user_id !== this.props.userId;
                    });

                    const newProps = Object.assign({}, this.props);
                    newProps.messages = messages;
                    this.setProps(newProps);
                });
            });
    }

    clickHandler(event:Event) {
        const target = event.target;
        const action = target.dataset.action;

        if (action) {
            switch(action) {
                case 'addChatPopup':
                    this.addChat();
                    break;
                case 'addUsetPopup':
                    this.addUser();
                    break;
                case 'sendMessage':
                    this.sendMessage(event);
                    break;
                default:
                    console.log('Unknown action');
            }
        }
    }

    addChat() {
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
        this.addChatPopup = new Popup(popupProps);
        this.element.appendChild(this.addChatPopup.element);
    }

    addUser() {
        const popupProps = {
            title: 'Добавить пользователя',
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
                    submit: this.submitUser
                }
            }
        };
        this.addUserPopup = new Popup(popupProps);
        this.element.appendChild(this.addUserPopup.element);
    }

    sendMessage(event: Event) {
        event.preventDefault();
        const message = this.element.querySelector('#messageInput').value;

        this.chatController.sendMessage(message, this.socket);
    }

    submitChat(event: Event) {
        event.preventDefault();
        const userLoginInput = event.target.querySelector('#userLogin');
        const me = this;

        this.chatController
            .addChat({title: userLoginInput.value})
            .then((response) => {
                const {id} = JSON.parse(response);
                const newProps = Object.assign({}, this.props);
                newProps.chatSideBar.chatList.chats.unshift({id, title: userLoginInput.value, avatar: null});
                this.setProps(newProps);
                me.addChatPopup.destroy();
            });
    }

    submitUser(event: Event) {
        event.preventDefault();
        const userLoginInput = event.target.querySelector('#userLogin');
        const me = this;


        this.chatController
            .addUser({chatId: this.props.activeChatId, login: userLoginInput.value})
            .then(() =>  {
                me.addUserPopup.destroy();
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

        new UserController().getUserData()
            .then((response: string) => JSON.parse(response))
            .then(({ id }) => {
                const newProps = Object.assign({}, this.props);
                newProps.userId = id;
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