enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type options = {
    data: Record<string, string> | null,
    timeout?: number,
    headers?: Record<string, string>,
    method?: Methods
}

const defaultType: options = {
    timeout: 5000,
    data: {}
};

function queryStringify(data: Record<string, string> | null) {
    let query = '';
    if (data) {
        Object.keys(data).forEach((key, index) => {
            const prefix = index === 0 ? '?' : '&';
            query += `${prefix}${key}=${data[key]}`;
        });
    }

    return query;
}

export default class HTTPTransport {
    get = (url: string, options: options = defaultType) => {
        url += queryStringify(options.data);
        options.data = null;
        return this.request(url, {...options, method: Methods.GET});
    };
    put = (url: string, options: options) => {
        return this.request(url, {...options, method: Methods.PUT});
    };
    post = (url: string, options: options) => {
        return this.request(url, {...options, method: Methods.POST});
    };
    delete = (url: string, options: options) => {
        return this.request(url, {...options, method: Methods.DELETE});
    };

    request = (url: string, options: options) => {
        const {data, headers, method, timeout} = options;
        let payload: string | null = null;
        if (data !== null) {
            payload = JSON.stringify(data);
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method!, url);

            xhr.onload = function() {
                resolve(xhr);
            };

            Object.entries(headers)
                .forEach(([key, value]: [string, string]) => {
                    xhr.setRequestHeader(key, value);
                });

            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.send(payload);
        });
    };
}