export const templateMarkup = `
    <main class="main">
        <div class="profile">
            <div class="profile__photo">
                <img src="{{avatar}}" alt="" id="profileAvatar" class="photo" width="130" height="130">
            </div>
            <div class="profile__title">
                <span class="title">{{displayName}}</span>
            </div>
            <div class="profile__data">
                <ul class="profile__list">
                    {{#each userData}}
                        <li class="profile__list-item">
                            <span class="text text_dark">{{label}}</span>
                            <span class="text text_gray">{{value}}</span>
                        </li>
                    {{/each}}
                </ul>
            </div>
            <div class="profile__footer">
                <div class="profile__link">
                    <a href="./messenger" class="link">К сообщениям</a>
                </div>
                <div class="profile__link">
                    <a href="./settings" class="link">Изменить данные</a>
                </div>
                <div class="profile__link">
                    <a href="./pass" class="link">Изменить пароль</a>
                </div>
                <div class="profile__link">
                    <div data-component-type="button" data-component-name="logoutButton"></div>
                </div>
            </div>
        </div>
    </main>`;