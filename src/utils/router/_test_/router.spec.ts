import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import 'mocha';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>', {
    url: 'http://localhost:3000'
});

global.document = dom.window.document;
// @ts-ignore
global.window = global.document.defaultView;


describe('check navigation', () => {
    it('navigation should mutate history', () => {
        const initialLength = window.history.length;
        window.history.pushState({page: 'sign-up'}, 'Sign-up', '/sign-up');
        const {pathname} = window.location;
        const isHistoryLengthChanged = initialLength + 1 === window.history.length;

        expect(pathname).to.eq('/sign-up');
        expect(isHistoryLengthChanged).to.eq(true);
    });
  });