export const templateMarkup = `
    <main class="main">
        <form class="form profile">
            <div class="profile__photo">
                <img src="{{avatar}}" alt="" class="photo" width="130" height="130">
            </div>
            <div class="profile__title">
                <span class="title">Иван</span>
            </div>
            <div class="profile__data">
                <ul class="profile__list">
                    {{#each profile.listData}}
                        <li class="profile__list-item">
                            <span class="text text_dark">{{label}}</span>
                            <input type="{{type}}" name="{{name}}" id="" class="form__input form__input_no-border text text_gray text_right" value="{{value}}">
                        </li>
                    {{/each}}
                </ul>
            </div>
            <div class="profile__footer">
                <button class="button">Сохранить</button>
            </div>
        </form>
    </main>`;