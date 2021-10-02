export function chatSocketFactory(config): WebSocket {
    const {userId, chatId, token} = config;
    const BASE_URL = 'wss://ya-praktikum.tech/ws/';
    const webSocket = new WebSocket(`${BASE_URL}chats/${userId}/${chatId}/${token}`);

    webSocket.addEventListener('open', () => {
        console.log('Connection seted up');
    });

    webSocket.addEventListener('message', () => {
        console.log('Message received');
    });

    webSocket.addEventListener('error', (event: Event) => {
        console.log('Socket error', event);
    });

    webSocket.addEventListener('close', (event: Event) => {
        if (event.wasClean) {
            console.log('Connection closed');
        } else {
            console.log('Сonnection terminated');
        }
    });

    return webSocket;
}