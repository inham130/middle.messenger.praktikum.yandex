export const templateMarkup = `
    <form name="{{name}}" action="" class="form" data-id={{_id}}>
        <ul class="form__control-list">
            {{#each children.controls}}
                <li class="form__control">
                    <label for="{{props.controlId}}" class="form__label">{{props.label}}</label>
                    <div data-component-type="input" data-source="controls" data-component-name="{{props.name}}"></div>
                    <div class="validation-msg" data-msg-for="{{props.controlId}}"></div>
                </li>
            {{/each}}
        </ul>
        {{#if children.button}}
            <div class="form__footer">
                <div data-component-type="button" data-source="button"></div>
            </div>
        {{/if}}
    </form>`;

