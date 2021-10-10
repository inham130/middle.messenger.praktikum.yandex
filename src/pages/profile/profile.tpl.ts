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
                    {{#each children.infoItems}}
                        <div data-component-type="userInfoItem" data-source="infoItems" data-component-name="{{props.name}}"></div>
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
                    <div data-component-type="button" data-source="logoutButton" data-component-name="logoutButton"></div>
                </div>
            </div>
        </div>
    </main>`;