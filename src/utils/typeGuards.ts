export function isEvent(value: unknown): value is Event {
    return value instanceof Event;
}

export function isEventTarget(value: unknown): value is EventTarget {
    return value instanceof EventTarget;
}

export function isString(value: unknown): boolean {
    return typeof value === 'string';
}