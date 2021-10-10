import Component from '../../utils/component/component';
import { templateMarkup } from './chatSideBar.tpl';

export class ChatSideBar extends Component {
    constructor(props) {
        props.template = templateMarkup;
        super(props);
    }
}