export const templateMarkup = `
    <main class="main">
        <div class="profile profile_edit">
            <div class="profile__photo">
                <img src="{{avatar}}" id="profileAvatar" alt="" class="photo" data-action="uploadPhoto" width="130" height="130">
            </div>
            <div class="profile__title">
                <span class="title">{{userName}}</span>
            </div>
            <div data-component-type="form"></div>
            <div class="profile__footer">
                <a href="/profile" class="link">Назад</a>
            </div>
        </div>
    </main>`;