import { isObject } from './index';

type Indexed<T = unknown> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const result = Object.assign({}, lhs);
    if (isObject(lhs) && isObject(rhs)) {
        Object.keys(rhs).forEach(key => {
            if (isObject(rhs[key])) {
                if (!(key in lhs)) {
                    Object.assign(result, { [key]: rhs[key] });
                } else {
                    result[key] = merge(lhs[key], rhs[key]);
                }
            }else {
                Object.assign(result, { [key]: rhs[key] });
            }
        });
    }

    return result;
}