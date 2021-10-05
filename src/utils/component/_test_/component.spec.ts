import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import Component from '../component';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>');
global.document = dom.window.document;

afterEach(() => {
    const root = document.querySelector('.app');
    root.innerHTML = '';
});

function createElement() {
    const props = {
        template: '<div class="element">content</div>'
    };

    return new Component(props);
}

function render(component: Component): void {
    const root = document.querySelector('.app');
    root.appendChild(component.element as Node);
}

describe('check base compomonent', () => {
    it('Render HTML element', () => {
        const el = createElement();
        render(el);

        const element = document.querySelector('.element');
        expect(element).to.not.be.null;
    });

    it('Changes in props leads to rerender', () => {
        const el = createElement();
        const newProps = {
            template: '<div class="new-element">content</div>'
        };
        el.setProps(newProps);
        render(el);

        const element = document.querySelector('.new-element');
        expect(element).to.not.be.null;
    });
});
