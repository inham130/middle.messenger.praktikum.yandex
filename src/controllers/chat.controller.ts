import { ChatAPI } from '../api/chat.api';
import { UserAPI } from '../api/user.api';
import { chatSocketFactory } from '../utils/web-soket/chatSocketFactory';

export class ChatController {
    private chatAPI: ChatAPI;
    private userAPI: UserAPI;

    constructor() {
        this.chatAPI = new ChatAPI();
        this.userAPI = new UserAPI();
    }

    getChats(): Promise<unknown> {
        return this.chatAPI.getChats();
    }

    addChat(data): Promise<unknown> {
        return this.chatAPI.addChat(JSON.stringify(data));
    }

    addUser({chatId, login}): Promise<unknown> {
        return this.userAPI
            .getUserId(JSON.stringify({login}))
            .then((response) => JSON.parse(response)[0])
            .then(({id}) => {
                const data = {users: [id], chatId};
                return this.chatAPI.addUser(JSON.stringify(data));
            })
            .then((response) => {
                console.log(response);
            });
    }

    getUsers(id): Promise<unknown> {
        return this.chatAPI.getUsers(id);
    }

    setUpConnection(config): Promise<unknown> {
        return this.chatAPI.getToken(config.chatId)
            .then((response) => JSON.parse(response))
            .then(({ token }) => {
                config.token = token;
                return chatSocketFactory(config);
            });
    }
}