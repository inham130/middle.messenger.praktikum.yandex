import {v4 as makeUUID} from 'uuid';
import EventBus from '../utils/eventBus';

type meta = {
    props: Record<any, any>
}
type event = {
    eventName: keyof HTMLElementEventMap,
    eventHandler: EventListenerOrEventListenerObject
}

export default class Component {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_RENDER: 'flow:render',
        FLOW_CDU: 'flow:component-did-update'
    };

    props: Record<any, any>;
    eventBus: EventBus;
    _element: HTMLElement | null;
    _fragment: DocumentFragment
    _meta: meta;
    _events: event[] = [];
    _id: string;

    constructor(props = {}) {
        this._meta = {
            props
        };

        this._id = makeUUID();
        this.props = this._makePropsProxy({...props, _id: this._id});

        this.eventBus = new EventBus();
        this._registerEvents();
        this.eventBus.emit(Component.EVENTS.INIT);
    }

    _registerEvents(): void {
        this.eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources(): void {
        this._element = null;
    }

    init(): void {
        this._createResources();
        this.eventBus.emit(Component.EVENTS.FLOW_CDM);
    }

    _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    componentDidMount(): void {}

    _componentDidUpdate(oldProps: Object, newProps: Object): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: Object, newProps: Object): boolean {
        return true;
    }

    setProps(nextProps: Object): void {
        if (nextProps) {
            Object.assign(this.props, nextProps);
        }
    }

    get element(): HTMLElement {
        return this._element;
    }

    _render(): void {
        this._removeEvents();

        const component = this.render();
        if (this._element === null) {
            this._element = component;
        } else if (component !== null) {
            this._element.replaceWith(component);
            this._element = component;
        }

        this._addEvents();
    }

    createFragmentFromString(str: string) {
        const template = document.createElement('template');
        template.innerHTML = str.trim();
        return template.content;
    }

    render() {}

    isString(value: unknown): value is string {
        if (typeof value === 'string') {
            return true;
        } else {
            return false;
        }
    }

    getContent(): HTMLElement {
        return this.element;
    }

    _removeEvents(): void {
        this._events.forEach((event) => {
            window.removeEventListener(event.eventName, event.eventHandler);
        });
        this._events = [];
    }

    _addEvents(): void {
        if (this.props.hasOwnProperty('events')) {
            const events: Record<keyof HTMLElementEventMap, EventListenerOrEventListenerObject> = this.props.events;

            Object.keys(events).forEach((eventName: keyof HTMLElementEventMap) => {
                const eventHandler: EventListenerOrEventListenerObject = events[eventName].bind(this);
                this.element.addEventListener(eventName, eventHandler);
                this._events.push({ eventName, eventHandler: eventHandler});
            });
        }
    }

    _makePropsProxy(props: Object) {
        const self = this;
        props = new Proxy(props, {
            set(target: { [key: string]: unknown }, prop: string, val: unknown) {
                const oldTarget = Object.assign({}, target);
                target[prop] = val;
                self.eventBus.emit(Component.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет прав');
            }
        });
        return props;
    }

    _createDocumentElement(tagName: string) {
        const element: HTMLElement = document.createElement(tagName);
        if (this.props.hasOwnProperty('settings')) {
            const {withInternalID = false} = this.props.settings;
            if (withInternalID) {
                element.setAttribute('data-id', this._id);
            }
        }
        return element;
    }
  }