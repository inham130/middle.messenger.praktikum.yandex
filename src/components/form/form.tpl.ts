export const templateMarkup = `
    <form name="{{name}}" action="" class="form" data-id={{_id}}>
        {{#each controls}}
            <div class="form__control">
                <label class="form__label">{{label}}</label>
                <div data-component-name="input"></div>
            </div>
        {{/each}}
    </form>`;