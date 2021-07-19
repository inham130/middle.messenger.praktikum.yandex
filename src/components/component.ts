import {v4 as makeUUID} from 'uuid';
import EventBus from '../utils/eventBus'

type meta = {
    tagName: string,
    props: Record<any, any>
}
type event = {
    eventName: keyof HTMLElementEventMap,
    eventHandler: EventListenerOrEventListenerObject
}

export default class Component {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };
    
    props: Record<any, any>;
    eventBus: EventBus;
    _element: HTMLElement;
    _meta: meta;
    _events: event[] = [];
    _id: string;
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName: string = 'div', props = {}) {
        this._meta = {
            tagName,
            props
        };

        this._id = makeUUID();
        this.props = this._makePropsProxy({...props, __id: this._id});

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
        const tagName: string = this._meta.tagName;
        this._element = this._createDocumentElement(tagName);
    }
  
    init(): void {
        this._createResources();
        this.eventBus.emit(Component.EVENTS.FLOW_CDM)
    }
  
    _componentDidMount(): void {
        this.componentDidMount();
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER)
    }
  
    componentDidMount(oldProps: Object = {}): void {}
  
    _componentDidUpdate(oldProps: Object, newProps: Object): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
        }
    }
  
    componentDidUpdate(oldProps: Object, newProps: Object): boolean {
        return true;
    }
  
    setProps (nextProps: Object): void {
        if (nextProps) {
            Object.assign(this.props, nextProps);
        }
    };
  
    get element(): HTMLElement {
        return this._element;
    }
  
    _render(): void {
        this._removeEvents();
        const component = this.render();
        this._element.innerHTML = component;
        this._addEvents();
    }
  
    render(): string {
        return '';
    }
  
    getContent(): HTMLElement {
        return this.element;
    }

    _removeEvents(): void {
        this._events.forEach((event) => {
            this.element.removeEventListener(event.eventName, event.eventHandler)
        });
    }

    _addEvents(): void {
        if (this.props.hasOwnProperty('events')) {
            const events: Record<keyof HTMLElementEventMap, EventListenerOrEventListenerObject> = this.props.events;

            Object.keys(events).forEach((eventName: keyof HTMLElementEventMap) => {
                this._element.addEventListener(eventName, events[eventName]);
                this._events.push({ eventName, eventHandler: events[eventName] });
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
  
    show() {
        this._element.style.display = 'block';
    }
  
    hide() {
        this._element.style.display = 'none';
    }
  }