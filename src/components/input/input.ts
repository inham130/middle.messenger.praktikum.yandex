import PlainObject from '../../types/plainObject';
import Component from '../../utils/component/component';
import { templateMarkup } from './input.tpl';

type inputProps = {
    label: string,
    name: string,
    type: string,
    controlId: string,
    validationFunc?: CallableFunction,
    events?: PlainObject,
    settings?: Record<string, unknown>,
    template?: string,
    accept?: string[]
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