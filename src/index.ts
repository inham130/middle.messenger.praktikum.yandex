import { login } from './pages/home/index';

const root = document.querySelector('#root');
if (root !== null) {
    root.innerHTML = login;
}