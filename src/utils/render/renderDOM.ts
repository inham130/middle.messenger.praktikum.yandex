import Component from '../../components/component';

export function render(query: string, component: Component): Element {
    const root = document.querySelector(query);

    if (root !== null) {
        root.appendChild(component.element as Node);
    }
    return root as Element;
}