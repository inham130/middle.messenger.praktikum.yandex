export const templateMarkup = `
    <form name="{{name}}" action="" class="form" data-id={{_id}}>
        <ul class="form__control-list">
            {{#each controls}}
                <li class="form__control">
                    <label class="form__label">{{label}}</label>
                    <div data-component-type="input" data-component-name="{{name}}"></div>
                </li>
            {{/each}}
        </ul>
        <div class="form__footer">
            <div data-component-type="button"></div>
        </div>
        {{#each hiddenFields}}
            <div data-component-type="input" data-component-name="{{name}}"></div>
        {{/each}}
    </form>`;