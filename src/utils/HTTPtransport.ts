type options = {
    timeout: number,
    data: Record<string, string>,
    headers?: Record<string, string>,
    method?: string
}

const defaultType: options = {
    timeout: 5000,
    data: {}
};

const METHODS = {
    GET: 'GET',
    POST:  'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

function queryStringify(data: Record<string, string>) {
    let query = '';
    if (data) {
        Object.keys(data).forEach((key, index) => {
            const prefix = index === 0 ? '?' : '&';
            query += `${prefix}${key}=${data[key]}`;
        });
    }

    return query;
}


class HTTPTransport {
    get = (url: string, options: options = defaultType) => {
        url += queryStringify(options.data);
        return this.request(url, {...options, method: METHODS.GET});
    };
    put = (url: string, options: options) => {
        return this.request(url, {...options, method: METHODS.PUT});
    };
    post = (url: string, options: options) => {
        return this.request(url, {...options, method: METHODS.POST});
    };
    delete = (url: string, options: options) => {
        return this.request(url, {...options, method: METHODS.DELETE});
    };

    request = (url: string, options: options) => {
        const {data, headers, method, timeout} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method!, url);

            xhr.onload = function() {
                resolve(xhr);
            };

            if (headers) {
                const _headers: [string, string] = Object.entries(headers)[0];
                xhr.setRequestHeader(..._headers);
            }
            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}