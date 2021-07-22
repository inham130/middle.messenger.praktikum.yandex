import Handlebars from 'handlebars';
import Component from '../component';
import { templateMarkup } from './input.tpl';

export class Input extends Component {
    constructor(props: {}) {
        super('input', props);
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        return template({type: this.props.type, name: this.props.name});
    }
}