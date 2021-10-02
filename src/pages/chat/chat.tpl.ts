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

                </div>
                <form class="chat__message-form">
                    <div class="attach-button">
                        <button class="button button_small" type="button">attach</button>
                    </div>
                    <div class="chat__message-input">
                        <textarea name="message" class="message-area"></textarea>
                    </div>
                    <div class="send-button">
                        <button class="button button_small" type="submit">send</button>
                    </div>
                </form>
            </div>
        </div>
    </main>`;

    /*
    <div class="message message_in">
        <span class="text text_break-word">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem earum soluta accusamus, obcaecati molestias, libero tempora in debitis voluptates rem provident qui.</span>
    </div>
    <div class="message message_in">
        <span class="text text_break-word">Lorem ipsum</span>
    </div>
    <div class="message message_in">
        <span class="text text_break-word">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem earum soluta accusamus</span>
    </div>

    <div class="message message_out">
        <span class="text text_break-word">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem earum soluta accusamus, obcaecati molestias, libero tempora in debitis voluptates rem provident qui.</span>
    </div>
    <div class="message message_out">
        <span class="text text_break-word">Lorem ipsum</span>
    </div>
    <div class="message message_out">
        <span class="text text_break-word">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem earum soluta accusamus</span>
    </div>
    */