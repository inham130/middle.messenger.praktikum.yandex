export class BaseAPI {
    protected host = 'https://ya-praktikum.tech/api/v2';

    create(): void {
        throw new Error('Not implemented');
    }

    request(): void {
        throw new Error('Not implemented');
    }

    update(): void {
        throw new Error('Not implemented');
    }

    delete(): void {
        throw new Error('Not implemented');
    }
}