import Component from '../../components/component';
import { render } from '../render/renderDOM';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export class Route {
    private _pathname: string;
    private _blockClass: Component;
    private _block: Component | null;
    private _props: Record<string, unknown>;

    constructor(pathname: string, view: Component, props: Record<string, unknown>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }
        this._block.show();
    }
}