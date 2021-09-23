export const templateMarkup = `
    <main class="main">
        <div class="chat">
            <div class="chat__sidebar">
                <div class="chat__sidebar-header">
                    <div class="chat__sidebar-menu">
                        <div class="avatar">
                            <img src="/static/avatar.png" alt="" class="photo" width="32" height="32">
                        </div>
                        <button class="button button_small" type="button">add chat</button>
                    </div>
                    <div class="search">
                        <input type="text" name="search" placeholder="Поиск">
                    </div>
                </div>

                <div data-component-type="chatList"></div>
            </div>
            <div class="chat__main">
                <div class="chat__menu">
                    <div class="chat__avatar">
                        <img src="/static/avatar.png" alt="" class="photo" width="32" height="32">
                    </div>
                    <div class="text text_dark chat__name">Chat name</div>
                    <div class="chat__actions">
                        <button class="button button_small" type="button">Actions</button>
                    </div>
                </div>
                <div class="chat__messages">
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