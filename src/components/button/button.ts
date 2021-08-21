import Handlebars from 'handlebars';
import Component from '../component';
import { templateMarkup } from './button.tpl';

enum ButtonTypes {
    submit = 'submit',
    button = 'button'
}

type buttonProps = {
    text: string,
    type: ButtonTypes,
    events?: Record<keyof HTMLElementEventMap, EventListenerOrEventListenerObject>,
    settings?: Record<string, unknown>,
    classes?: string,
    action: string,
}

export class Button extends Component {
    constructor(props: buttonProps) {
        super(props);
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        return fragment.firstChild as HTMLElement;
    }
}