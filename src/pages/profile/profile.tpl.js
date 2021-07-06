export const templateMarkup = `
    <main class="main">
        <div class="profile">
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
                        <span class="text text_gray">{{value}}</span>
                    </li>
                    {{/each}}
                </ul>
            </div>
            <div class="profile__footer">
                <div class="profile__link">
                    <a href="./profile-edit-data.html" class="link">Изменить данные</a>
                </div>
                <div class="profile__link">
                    <a href="./profile-edit-pass.html" class="link">Изменить пароль</a>
                </div>
                <div class="profile__link">
                    <a href="" class="link link_red">Выйти</a>
                </div>
            </div>
        </div>
    </main>`;