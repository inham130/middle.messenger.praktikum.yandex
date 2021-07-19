import { login } from './pages/home/index';

import Button from './components/button/button';

const button = new Button({ 
    text: 'click me',
    events: {
        click: (event: Event) => {
            console.log(event);
        },
    },
    settings: {
        withInternalID: true
    }
});

const root = document.querySelector('#root');
if (root !== null) {
    root.innerHTML = login;
    root.appendChild(button.getContent());
}

setTimeout(() => {
    button.setProps({
        text: 'Click me, please',
        events: {
            click: (event: Event) => {
                console.log('super event');
            },
        },
    });
  }, 2000);