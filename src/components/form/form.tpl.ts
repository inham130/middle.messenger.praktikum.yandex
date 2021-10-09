export const templateMarkup = `
    <form name="{{name}}" action="" class="form" data-id={{_id}}>
        <ul class="form__control-list">
            {{#each children.controls}}
                <li class="form__control">
                    <label for="{{controlId}}" class="form__label">{{label}}</label>
                    <div data-component-type="input" data-source="controls" data-component-name="{{name}}"></div>
                    <div class="validation-msg" data-msg-for="{{controlId}}"></div>
                </li>
            {{/each}}
        </ul>
        <div class="form__footer">
            <div data-component-type="button" data-source="button"></div>
        </div>
    </form>`;

