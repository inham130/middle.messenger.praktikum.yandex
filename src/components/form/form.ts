import Component from '../../utils/component/component';
import { templateMarkup } from './form.tpl';

type formProps = {
    children: Record<string, unknown>,
    events?: Record<keyof HTMLElementEventMap, EventListenerOrEventListenerObject>,
    settings?: Record<string, unknown>
}
export class Form extends Component {
    constructor(props: formProps) {
        props.template = templateMarkup;
        super(props);

        this.registerCustomEvents();
    }

    registerCustomEvents(): void {
        this.element.addEventListener('validateControl', this.validateControl);
    }

    validateControl(event: CustomEvent) {
        const {isValid, controlId} = event.detail;
        const msgContainer = document.querySelector(`[data-msg-for="${controlId}"]`);

        if (msgContainer === null) {
            return;
        }
        if (isValid === false) {
            if (msgContainer.innerHTML === '') {
                const hintSpan = document.createElement('span');
                hintSpan.classList.add('text', 'text_red', 'text_small');
                hintSpan.setAttribute('data-hint-for', controlId);
                hintSpan.textContent = 'Неверный ввод';
                msgContainer.appendChild(hintSpan);
            }
        } else if (msgContainer.innerHTML !== '') {
            msgContainer.innerHTML = '';
        }
    }

    validateForm() {
        let isFormValid = true;
        this.props.children.controls.forEach(function(control) {
            if (control.props.validationFunc) {
                const isControlValid = control.props.validationFunc.call(control, control.element.value);
                if (isControlValid === false) {
                    isFormValid = false;
                }
            }
        });

        return isFormValid;
    }

    submit(event: Event) {
        event.preventDefault();
        const form: HTMLFormElement | null = document.querySelector(`form[name="${this.props.name}"]`);
        const isFormValid = this.validateForm();

        if (isFormValid) {
            const formData: FormData = new FormData(form);

            const customEvent = new CustomEvent('formSubmit', {
                bubbles: true,
                detail: {formData}
            });
            this.element.dispatchEvent(customEvent);
        }
    }
}