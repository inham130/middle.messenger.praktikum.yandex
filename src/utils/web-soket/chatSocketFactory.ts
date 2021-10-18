import PlainObject from '../../types/plainObject';

export function chatSocketFactory(config: PlainObject): WebSocket {
    const {userId, chatId, token} = config;
    const host = 'wss://ya-praktikum.tech/ws/';
    const webSocket = new WebSocket(`${host}chats/${userId}/${chatId}/${token}`);

    webSocket.addEventListener('open', () => {
        console.log('Connection seted up');
    });

    webSocket.addEventListener('message', () => {
        console.log('Message received');
    });

    webSocket.addEventListener('error', (event: any) => {
        console.log('Socket error', event);
    });

    webSocket.addEventListener('close', (event: any) => {
        if (event.wasClean) {
            console.log('Connection closed');
        } else {
            console.log('Сonnection terminated');
        }
    });

    return webSocket;
}