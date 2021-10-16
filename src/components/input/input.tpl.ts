export const templateMarkup = `
    <input data-id={{_id}}
        id="{{controlId}}"
        name="{{name}}"
        class="form__input"
        type="{{type}}"
        {{#if accept}}
            accept={{ accept }}
        {{/if}}
        value="{{value}}"
    >`;