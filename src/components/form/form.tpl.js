export const templateMarkup = `
    <form action="" class="form">
        {{#each form.controls}}
            <div class="form__control">
                <label class="form__label">{{label}}</label>
                <input name="{{name}}" class="form__input" type="{{type}}">
            </div>
        {{/each}}
    </form>`;