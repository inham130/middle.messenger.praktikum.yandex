export function isObject(value: unknown): boolean {
    const type = typeof value;
    return type === 'function' || type === 'object' && !!value;
}