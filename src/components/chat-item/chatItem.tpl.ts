export const templateMarkup = `
    <li class="chat__item">
        <div class="chat__avatar">
            <img src="/static/avatar.png" alt="" class="photo" width="47" height="47">
        </div>
        <div class="chat__preview">
            <div class="text text_dark chat__name">{{title}}</div>
            <div class="text text_gray text_truncate chat__last-message">
                {{last_message}}
            </div>
        </div>
        <div class="chat__meta-info">
            <i class="arrow arrow_down"></i>
            <div class="text text_gray chat__count">{{unread_count}}</div>
        </div>
    </li>`;


    /*
    <div class="text text_gray chat__time">
        <time datetime="10:14">{{lastDate}}</time>
    </div>
    */