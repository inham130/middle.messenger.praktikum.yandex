import Handlebars from 'handlebars';
import Component from '../component';
import { Input } from '../input/index';
import { templateMarkup } from './form.tpl';

export class Form extends Component {
    controls: string[];

    constructor(props: {}) {
        super('form', props);

        this.props.form.controls.forEach((control: Record<string, string>, index: number) => {
            const input: string = new Input({name: control.name, type: control.type}).render();
            this.props.form.controls[index].input = input
        });
    }

    render() {
        const template = Handlebars.compile(templateMarkup);
        return template({form: this.props.form});
    }
}