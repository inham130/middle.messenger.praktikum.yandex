import Component from '../../utils/component/component';
import { templateMarkup } from './chatList.tpl';

export class ChatList extends Component {
    constructor(props) {
        props.template = templateMarkup;
        super(props);
    }
}