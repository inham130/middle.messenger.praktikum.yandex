const PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    LOGIN: /^[a-z0-9_-]{3,15}$/,
    NAME: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
    PHONE: /^\+?(\d{1})\(?(\d{3})\)?[-|\s]?(\d{3})[-|\s]?(\d{2})[-|\s]?(\d{2})$/,
    PASSWORD: /^[a-z0-9_-]{3,15}$/
}

const makeValidationFunc = function(pattern: RegExp) {
    return function(event: Event) {
        if (!isEventTarget(event.target) || !isString(event.target.value)) {
            return;
        }
        const value: string = event.target.value;
        const test = value.match(pattern);
        let isValid = false;
        
        if (test !== null) {
            isValid = true;
        }
        
        this.updateValidity(isValid);
    }
}

function isEventTarget(value: unknown): value is EventTarget {
    return value instanceof EventTarget
}

function isString(value: unknown): value is string {
    return typeof value === 'string'
}

export const validation = {
    email: makeValidationFunc(PATTERNS.EMAIL),
    login: makeValidationFunc(PATTERNS.LOGIN),
    name: makeValidationFunc(PATTERNS.NAME),
    phone: makeValidationFunc(PATTERNS.PHONE),
    password: makeValidationFunc(PATTERNS.PASSWORD)
}