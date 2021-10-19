import Component from '../../utils/component/component';
import { ChatSideBar } from '../../components/chat-side-bar';
import { ChatController } from '../../controllers/chat.controller';
import { Popup } from '../../components/popup';
import { UserController } from '../../controllers/user.controller';
import { Button, ButtonTypes } from '../../components/button';
import { ChatList } from '../../components/chat-list';
import { ChatItem } from '../../components/chat-item/chatItem';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import PlainObject from '../../types/plainObject';
import { templateMarkup } from './chat.tpl';
import avatar from '/static/avatar.png';

type chatProps = Record<string, unknown>
const chatProps = {
    template: templateMarkup,
    activeChatId: null,
    userId: null,
    messages: [],
    children: {
        chatSideBar: new ChatSideBar({
            avatar,
            children: {
                button: new Button({
                    text: 'Добавить чат',
                    type: ButtonTypes.button,
                    classes: 'button_small',
                    action: 'addChatPopup'
                }),
                chatList: new ChatList({
                    children: {
                        chats: []
                    }
                })
            }
        })
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
    addChatPopup: Popup;
    addUserPopup: Popup;

    constructor(props: chatProps = chatProps) {
        super(props);

        this.submitChat = this.submitChat.bind(this);
        this.addUser = this.addUser.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    registerCustomEvents(): void {
        this.element.addEventListener('chatItemClick', (e: CustomEvent) => this.selectChat(e));
    }

    selectChat(event: CustomEvent) {
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

                this.socket.addEventListener('message', (event: any) => {
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

                    this.setProps({ ...this.props, messages });
                });
            });
    }

    clickHandler(event:Event) {
        const target = event.target;
        const action = (target as HTMLElement).dataset.action;

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
            children: {
                form: new Form({
                    name: 'addChat',
                    children: {
                        controls: [new Input({
                            label: '',
                            name: 'userLogin',
                            type: 'text',
                            controlId: 'userLogin'
                        })],
                        button: new Button({
                            text: 'Добавить',
                            type: ButtonTypes.submit
                        })
                    },
                    events: {
                        submit: this.submitChat
                    }
                })
            }
        };
        this.addChatPopup = new Popup(popupProps);
        this.element.appendChild(this.addChatPopup.element);
    }

    addUser() {
        const popupProps = {
            title: 'Добавить пользователя',
            children: {
                form: new Form({
                    name: 'addChat',
                    children: {
                        controls: [new Input({
                            label: '',
                            name: 'userLogin',
                            type: 'text',
                            controlId: 'userLogin'
                        })],
                        button: new Button({
                            text: 'Добавить',
                            type: ButtonTypes.submit
                        })
                    },
                    events: {
                        submit: this.submitUser
                    }
                })
            }
        };
        this.addUserPopup = new Popup(popupProps);
        this.element.appendChild(this.addUserPopup.element);
    }

    sendMessage(event: Event) {
        event.preventDefault();
        const message = (this.element.querySelector('#messageInput') as HTMLInputElement).value;

        this.chatController.sendMessage(message, this.socket);
    }

    submitChat(event: Event) {
        event.preventDefault();
        const userLoginInput: HTMLInputElement = (event.target as HTMLInputElement).querySelector('#userLogin');

        this.chatController
            .addChat({title: userLoginInput?.value})
            .then(({id}) => {
                const newChatItem = new ChatItem({id, title: userLoginInput?.value, avatar: null});
                const chatList = [newChatItem, ...this.props.children.chatSideBar.props.children.chatList.props.children.chats];
                this.props.children.chatSideBar.props.children.chatList.setProps({children: {chats: chatList}});
                this.addChatPopup.destroy();
            });
    }

    submitUser(event: Event) {
        event.preventDefault();
        const userLoginInput: HTMLInputElement = (event.target as HTMLInputElement).querySelector('#userLogin');

        this.chatController
            .addUser({chatId: this.props.activeChatId, login: userLoginInput?.value})
            .then(() =>  {
                this.addUserPopup.destroy();
            });
    }

    componentDidMount() {
        this.chatController = new ChatController();

        this.chatController.getChats()
            .then((chats: PlainObject[]) => {
                const chatList = [];
                chats.forEach(chat => {
                    const chatItem = new ChatItem(chat);
                    chatList.push(chatItem);
                });
                this.props.children.chatSideBar.props.children.chatList.setProps({children: {chats: chatList}});
            });

        new UserController().getUserData()
            .then(({ id, avatar }) => {
                const newProps = Object.assign({}, this.props);
                newProps.userId = id;
                newProps.children.chatSideBar.props.avatar = `https://ya-praktikum.tech/api/v2/resources${avatar}`;
                this.setProps(newProps);
            });
    }
}