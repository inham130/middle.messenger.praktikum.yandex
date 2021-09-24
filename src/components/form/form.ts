import Handlebars  from 'handlebars';
import Component from '../../utils/component/component';
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
        this.controls.forEach(function(control) {
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
            console.log(Object.fromEntries(formData));

            const customEvent = new CustomEvent('formSubmit', {
                bubbles: true,
                detail: {formData}
            });
            this.element.dispatchEvent(customEvent);
        }
    }

    render(): HTMLElement {
        this.controls = [];

        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        this.props.controls.forEach((control: Record<string, unknown>) => {
            const selector = `[data-component-type="input"][data-component-name="${control.name}"]`;
            const input: HTMLElement | null = fragment.querySelector(selector);
            if (input !== null) {
                const inputComponent: Input = new Input(control);
                this.controls.push(inputComponent);
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