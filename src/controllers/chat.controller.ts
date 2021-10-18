import ChatAPI from '../api/chat.api';
import UserAPI from '../api/user.api';
import { chatSocketFactory } from '../utils/web-soket/chatSocketFactory';
import PlainObject from '../types/plainObject';

export class ChatController {
    private chatAPI = ChatAPI;
    private userAPI = UserAPI;

    constructor() {}

    getChats(): Promise<unknown> {
        return this.chatAPI.getChats();
    }

    addChat(data: Record<string, string>): Promise<unknown> {
        return this.chatAPI.addChat(JSON.stringify(data));
    }

    addUser({chatId, login}: Record<string, string>): Promise<unknown> {
        return this.userAPI
            .getUserId(JSON.stringify({login}))
            .then((response: PlainObject[]) => {
                const {id} = response[0];
                const data = {users: [id], chatId};
                return this.chatAPI.addUser(JSON.stringify(data));
            });
    }

    getUsers(id: number): Promise<unknown> {
        return this.chatAPI.getUsers(id);
    }

    setUpConnection(config: PlainObject): Promise<unknown> {
        return this.chatAPI.getToken(config.chatId)
            .then(({ token }) => {
                config.token = token;
                return chatSocketFactory(config);
            });
    }

    sendMessage(message: string, socket: WebSocket) {
        socket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
    }
}