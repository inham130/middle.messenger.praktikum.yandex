import Component from '../../utils/component/component';
import { templateMarkup } from './button.tpl';

export enum ButtonTypes {
    submit = 'submit',
    button = 'button',
}

type buttonProps = {
    text: string,
    type: ButtonTypes,
    events?: Record<keyof HTMLElementEventMap, EventListenerOrEventListenerObject>,
    settings?: Record<string, unknown>,
    classes?: string,
    template?: string
    action?: string
}

export class Button extends Component {
    constructor(props: buttonProps) {
        props.template = templateMarkup;
        super(props);
    }
}