export const templateMarkup = `
    <main class="main">
        <div class="chat">
            <div data-component-type="chatSideBar"></div>
            <div class="chat__main">
                <div class="chat__menu">
                    {{#if avatar}}
                        <div class="chat__avatar">
                            <img src="{{avatar}}" alt="" class="photo" width="32" height="32">
                        </div>
                    {{/if}}
                    {{#if chatTitle}}
                        <div class="text text_dark chat__name">{{chatTitle}}</div>
                    {{/if}}
                    {{#if activeChatId}}
                        <div class="chat__actions">
                            <button class="button button_small" data-action="addUsetPopup" type="button">Добавить пользователя</button>
                        </div>
                    {{/if}}
                </div>
                <div class="chat__messages">
                    {{#each messages}}
                        <div class="message {{#if incoming}}message_in{{else}}message_out{{/if}}">
                            <span class="text text_break-word">{{content}}</span>
                        </div>
                    {{/each}}
                </div>
                <form class="chat__message-form">
                    <div class="chat__message-input">
                        <input type="text" name="message" id="messageInput" class="message-area"></input>
                    </div>
                    <div class="send-button">
                        <button class="button button_small" data-action="sendMessage" type="submit">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    </main>`;