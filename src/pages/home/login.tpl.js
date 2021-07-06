import { Form } from '../../components/form/index';

new Form();
export const templateMarkup = `
    <main class="main">
        <div class="login">
            <div class="login__title">
                <h2 class="title">Вход</h2>
            </div>
            {{>form}}
            <div class="login__footer">
                <button class="button">Авторизоваться</button>
                <a href="./signin.html" class="link">Нет аккаунта?</a>
            </div>
        </div>
    </main>`;