export const templateMarkup = `
    <li class="chat__item">
        <div class="chat__avatar">
            <img src="{{avatar}}" alt="" class="photo">
        </div>
        <div class="chat__preview">
            <div class="text text_dark chat__name">{{title}}</div>
            <div class="text text_gray text_truncate chat__last-message">
                {{last_message.content}}
            </div>
        </div>
        <div class="chat__meta-info">
            <i class="cross"></i
            <div class="text text_gray chat__count">{{unread_count}}</div>
        </div>
    </li>`;