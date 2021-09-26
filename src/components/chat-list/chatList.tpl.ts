export const templateMarkup = `
    <ul class="chat__list">
        {{#each chats}}
            <div data-component-type="chatItem"></div>
        {{/each}}
    </ul>
`;