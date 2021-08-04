import { isString} from './typeGuards';

const PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    LOGIN: /^[a-z0-9_-]{3,15}$/,
    NAME: /^[a-zA-Zа-яА-ЯёЁ-]{3,15}$/,
    PHONE: /^\+?(\d{1})\(?(\d{3})\)?[-|\s]?(\d{3})[-|\s]?(\d{2})[-|\s]?(\d{2})$/,
    PASSWORD: /^[a-z0-9_-]{3,15}$/
};

const makeValidationFunc = function(pattern: RegExp) {
    return function(value: string) {
        if (!isString(value)) {
            return;
        }
        const test = value.match(pattern);
        let isValid = false;

        if (test !== null) {
            isValid = true;
        }

        this.updateValidity(isValid);

        return isValid;
    };
};

export const validation = {
    email: makeValidationFunc(PATTERNS.EMAIL),
    login: makeValidationFunc(PATTERNS.LOGIN),
    name: makeValidationFunc(PATTERNS.NAME),
    phone: makeValidationFunc(PATTERNS.PHONE),
    password: makeValidationFunc(PATTERNS.PASSWORD)
};