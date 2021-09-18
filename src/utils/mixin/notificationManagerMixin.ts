import { NOTIFICATION_TYPES } from './notificationTypes';

function showNotification(type: string, message: string, selector = '#notificationContainer') {
    const notificationContainer = document.querySelector(selector);

    if (notificationContainer === null) {
        return;
    }

    if (notificationContainer.innerHTML !== '') {
        notificationContainer.innerHTML = '';
    }

    const hintSpan = document.createElement('span');
    hintSpan.classList.add('text', type);
    hintSpan.textContent = message;
    notificationContainer.appendChild(hintSpan);
}

export const notificationManagerMixin = {
    showNotification,

    showHTTPError(responseData, selector = '#notificationContainer'): void {
        const response = JSON.parse(responseData.response);
        const {reason: errorText = 'что - то пошло не так'} = response;

        showNotification(NOTIFICATION_TYPES.ERROR, errorText, selector);
    },

    showHTTPSuccess(message = 'Данные сохранены', selector = '#notificationContainer') {
        showNotification(NOTIFICATION_TYPES.SUCCESS, message, selector);
    }
};