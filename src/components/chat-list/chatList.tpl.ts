export const templateMarkup = `
    <ul class="chat__list">
        {{#each children.chats}}
            <div data-component-type="chatItem" data-source="chats"></div>
        {{/each}}
    </ul>
`;