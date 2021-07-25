import Handlebars  from 'handlebars';
import Component from '../component';
import { Input } from '../input/index';
import { templateMarkup } from './form.tpl';

export class Form extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        const inputs: HTMLElement[] = Array.from(fragment.querySelectorAll('[data-component-name="input"]'));
        inputs.forEach((input, index) => {
            const inputComponent: Input = new Input(this.props.controls[index]);
            input.replaceWith(inputComponent.getContent());
        });

        return fragment.firstChild;
    }
}