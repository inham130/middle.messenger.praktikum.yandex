import Component from '../component/component';
import { render } from '../render/renderDOM';

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export class Route {
    private _pathname: string;
    private _blockClass: any;
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
            this._block.remove();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
        }

        render(this._props.rootQuery as string, this._block as Component);
    }
}