import Component from "../component";

type buttonProps = {
    text: string,
    events?: {},
    settings?: {}
}

export default class Button extends Component {
    props: buttonProps;

    constructor(props: buttonProps) {
        super('button', props);
    }

    render() {
        return `<div>${this.props.text}</div>`;
    }
}