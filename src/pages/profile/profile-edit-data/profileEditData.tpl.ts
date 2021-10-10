export const templateMarkup = `
    <main class="main">
        <div class="profile profile_edit">
            <div id="notificationContainer"></div>
            <div class="profile__photo">
                <img src="{{avatar}}" id="profileAvatar" alt="" class="photo photo_edit" data-action="uploadPhoto">
            </div>
            <div class="profile__title">
                <span class="title">{{userName}}</span>
            </div>
            <div data-component-type="form" data-source="form"></div>
            <div class="profile__footer">
                <a href="/profile" class="link">К профилю</a>
            </div>
        </div>
    </main>`;