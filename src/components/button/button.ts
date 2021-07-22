import Handlebars from 'handlebars';
import Component from '../component';
import { templateMarkup } from './button.tpl';

type buttonProps = {
    text: string,
    events?: {},
    settings?: {}
}

export class Button extends Component {
    props: buttonProps;

    constructor(props: buttonProps) {
        super('button', props);
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        return template({text: this.props.text});
    }
}