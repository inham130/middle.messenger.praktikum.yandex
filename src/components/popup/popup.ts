import Handlebars from 'handlebars';
import Component from '../../utils/component/component';
import { Form } from '../../components/form';
import { templateMarkup } from './popup.tpl';

export class Popup extends Component {
    constructor(props) {
        super(props);

        this.handleHide();
    }

    handleHide() {
        const blockLayer = this.element.querySelector('.popup__block-layer');
        blockLayer.addEventListener('click', () => {
            this.destroy();
        });
    }

    render(): HTMLElement {
        const template = Handlebars.compile(templateMarkup);
        const fragment: DocumentFragment = this.createFragmentFromString(template(this.props));

        /* const formTarget: HTMLElement | null = fragment.querySelector('[data-component-type="form"]');
        if (formTarget !== null) {
            const form = new Form(this.props.form);
            formTarget.replaceWith(form.getContent() as Node);
        } */

        return fragment.firstChild as HTMLElement;
    }
}