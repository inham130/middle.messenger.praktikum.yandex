export const errorHandlerMixin = {
    handleHTTPError(error, selector = '#notificationContainer'): void {
        const response = JSON.parse(error.response);
        const errorContainer = document.querySelector(selector);

        if (errorContainer === null) {
            return;
        }

        const {reason: errorText = 'что - то пошло не так'} = response;
        if (errorContainer.innerHTML !== '') {
            errorContainer.innerHTML = '';
        }

        const hintSpan = document.createElement('span');
        hintSpan.classList.add('text', 'text_red');
        hintSpan.textContent = errorText;
        errorContainer.appendChild(hintSpan);
    }
};