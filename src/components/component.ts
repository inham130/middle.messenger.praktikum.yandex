import {v4 as makeUUID} from 'uuid';
import EventBus from '../utils/eventBus';

type meta = {
    props: Record<string, unknown>
}
type event = {
    eventName: keyof HTMLElementEventMap,
    eventHandler: EventListener
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

    private _registerEvents(): void {
        this.eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
        this.eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources(): void {
        this._element = null;
    }

    init(): void {
        this._createResources();
        this.eventBus.emit(Component.EVENTS.FLOW_CDM);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    componentDidMount(): void {}

    private _componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
        return true;
    }

    setProps(nextProps: unknown): void {
        if (nextProps && typeof nextProps === 'object') {
            Object.assign(this.props, nextProps);
        }
    }

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
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

    render(): HTMLElement | null {
        return null;
    }

    getContent(): HTMLElement | null {
        return this.element;
    }

    private _removeEvents(): void {
        this._events.forEach((event) => {
            window.removeEventListener(event.eventName, event.eventHandler);
        });
        this._events = [];
    }

    private _addEvents(): void {
        if (this.props.hasOwnProperty('events') && this.element !== null) {
            const events: Record<keyof HTMLElementEventMap, EventListener> = this.props.events;

            Object.keys(events).forEach((eventName: keyof HTMLElementEventMap) => {
                const eventHandler: EventListener = events[eventName].bind(this);
                this.element.addEventListener(eventName, eventHandler);
                this._events.push({ eventName, eventHandler: eventHandler});
            });
        }
    }

    private _makePropsProxy(props: Record<string, unknown>) {
        props = new Proxy(props, {
            set(target: { [key: string]: unknown }, prop: string, val: unknown) {
                const oldTarget = Object.assign({}, target);
                target[prop] = val;
                this.eventBus.emit(Component.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет прав');
            }
        });
        return props;
    }

    hide() {
        this.element.setAttribute('style', 'display:none');
    }
    show() {
        this.element.removeAttribute('style');
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this._removeEvents();
        this.remove();
        this.props = null;
        this._meta = null;
        this._element = null;
    }
}