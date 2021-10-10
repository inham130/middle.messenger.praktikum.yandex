import Component from '../../utils/component/component';
import { templateMarkup } from './userInfoItem.tpl';


export class userInfoItem extends Component {
    constructor(props) {
        props.template = templateMarkup;
        super(props);
    }
}