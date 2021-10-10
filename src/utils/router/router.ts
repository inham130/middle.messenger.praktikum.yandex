import { Route } from './route';

class Router {
    static __instance: Router;
    private _currentRoute: Route | null;
    routes: Route[];
    history: History;

    constructor(rootQuery: string) {
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
    }

    setRootQuery(rootQuery) {
        this._rootQuery =  rootQuery;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);

        return this;
    }

    start(): void {
        window.onpopstate = event => {
            this._onRoute(event.currentTarget.location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname): Route {
        return this.routes.find(route => route.match(pathname));
    }
}
const instance = new Router();
export { instance as Router };