export const templateMarkup = `
    <div class="chat__sidebar">
        <div class="chat__sidebar-header">
            <div class="chat__sidebar-menu">
                <div class="avatar">
                    <img src="{{avatar}}" alt="" class="photo" width="32" height="32">
                </div>
                <div data-component-type="button"></div>
            </div>
            <div class="search">
                <input type="text" name="search" placeholder="Поиск">
            </div>
        </div>
        <div data-component-type="chatList"></div>
    </div>`;