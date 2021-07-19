export const templateMarkup = `
    <main class="main">
        <div class="login">
            <div class="login__title">
                <h2 class="text title title_h2">Вход</h2>
            </div>
            {{>form}}
            <div class="login__footer">
                <button class="button">Авторизоваться</button>
                <a href="./signup.html" class="link">Нет аккаунта?</a>
            </div>
        </div>
    </main>`;