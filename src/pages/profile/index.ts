import { html as markup } from './profile';

const root = document.querySelector('#root');
if (root !== null) {
    root.innerHTML = markup;
}