import Component from '../components/component';

export function render(query: string, component: Component) {
    const root = document.querySelector(query);

    if (root !== null) {
        root.appendChild(component.element);
    }
    return root;
}