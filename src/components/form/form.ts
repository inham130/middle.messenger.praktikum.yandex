import Handlebars  from 'handlebars';
import Component from '../component';
import { Input } from '../input/index';
import { Button } from '../button';
import { templateMarkup } from './form.tpl';

type formProps = {
    controls: Record<string, unknown>,
    events?: Record<keyof HTMLElementEventMap, EventListenerOrEventListenerObject>,
    settings?: Record<string, unknown>
}
export class Form extends Component {
    constructor(props: formProps) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        this.props.controls.forEach((control: Record<string, unknown>) => {
            const selector = `[data-component-type="input"][data-component-name="${control.name}"]`;
            const input: HTMLElement | null = fragment.querySelector(selector);
            if (input !== null) {
                const inputComponent: Input = new Input(control);
                input.replaceWith(inputComponent.getContent() as Node);
            }
        });

        const buttonTarget: ChildNode | null = fragment.querySelector('[data-component-type="button"]');
        if (buttonTarget !== null) {
            const button = new Button(this.props.button);
            buttonTarget.replaceWith(button.getContent() as Node);
        }

        return fragment.firstChild as HTMLElement;
    }
}