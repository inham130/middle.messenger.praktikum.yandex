import Handlebars  from 'handlebars';
import Component from '../component';
import { Input } from '../input/index';
import { Button } from '../button';
import { templateMarkup } from './form.tpl';

export class Form extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        this.props.controls.forEach((control) => {
            const input: HTMLElement = fragment.querySelector(`[data-component-type="input"][data-component-name="${control.name}"]`);
            const inputComponent: Input = new Input(control);
            input.replaceWith(inputComponent.getContent());
        });

        const buttonTarget: HTMLElement | null = fragment.querySelector('[data-component-type="button"]');
        if (buttonTarget !== null) {
            const button = new Button(this.props.button);
            buttonTarget.replaceWith(button.getContent());
        }

        return fragment.firstChild;
    }
}