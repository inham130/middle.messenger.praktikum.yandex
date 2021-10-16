import Component from '../../utils/component/component';
import { templateMarkup } from './popup.tpl';

export class Popup extends Component {
    constructor(props) {
        props.template = templateMarkup;
        super(props);

        this.handleHide();
    }

    handleHide() {
        const blockLayer = this.element.querySelector('.popup__block-layer');
        blockLayer.addEventListener('click', () => {
            this.destroy();
        });
    }
}