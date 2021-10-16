import Component from '../../utils/component/component';
import { templateMarkup } from './input.tpl';

type inputProps = {
    name: string,
    type: string,
    controlId: string,
    validationFunc?: CallableFunction,
    events?: Record<keyof HTMLElementEventMap, EventListenerOrEventListenerObject>,
    settings?: Record<string, unknown>
}
export class Input extends Component {
    constructor(props: inputProps) {
        props.template = templateMarkup;
        super(props);
    }

    updateValidity(isValid: boolean): void {
        const event = new CustomEvent('validateControl', {
            bubbles: true,
            detail: {
                isValid,
                controlId: this.props.controlId
            }
        });
        this.element.dispatchEvent(event);

        if (this.element !== null) {
            if (isValid) {
                this.element.classList.remove('form__input_invalid');
            } else {
                this.element.classList.add('form__input_invalid');
            }
        }
    }
}