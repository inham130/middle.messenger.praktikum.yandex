export const templateMarkup = `
    <div class="chat__sidebar">
        <div class="chat__sidebar-header">
            <div class="chat__sidebar-menu">
                <div class="avatar">
                    <a href="./profile" class="link">
                        <img src="{{avatar}}" alt="" class="photo">
                    </a>
                </div>
                <div data-component-type="button" data-source="button"></div>
            </div>
            <div class="search">
                <input type="text" name="search" placeholder="Поиск">
            </div>
        </div>
        <div data-component-type="chatList" data-source="chatList"></div>
    </div>`;