import { ChatAPI } from '../api/chat.api';

export class ChatController {
    private chatAPI: ChatAPI;

    constructor() {
        this.chatAPI = new ChatAPI();
    }

    getChats(): Promise<unknown> {
        return this.chatAPI.getChats();
    }

    addChat(data): Promise<unknown> {
        return this.chatAPI.addChat(JSON.stringify(data));
    }
}