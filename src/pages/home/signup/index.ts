import { html as signup } from './signup'

const root = document.querySelector('#root');
if (root !== null) {
    root.innerHTML = signup;
}