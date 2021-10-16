import {expect} from 'chai';
import * as sinon from 'sinon';
import HTTPTransport from '../HTTPtransport';

const host = 'https://ya-praktikum.tech/api/v2';
const http = new HTTPTransport(host);

describe('check httpTransport', () => {
    const requests: sinon.SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        const xhr: SinonFakeXMLHttpRequestStatic = global.XMLHttpRequest;

        xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
            requests.push(request);
        };
    });

    afterEach(() => {
        global.XMLHttpRequest.restore();
        requests.length = 0;
    });

    it('should send POST', () => {
        const url = '/auth/signup';
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                first_name: '',
                second_name: '',
                login: '',
                email: '',
                password: '',
                phone: ''
            })
        };
        http.post(url, requestOptions);

        expect(requests.length).to.eq(1);
        expect(requests[0].method).to.eq('POST');
    });

    it('should send GET', () => {
        const url = '/auth/signup';
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        http.get(url, requestOptions);

        expect(requests.length).to.eq(1);
        expect(requests[0].method).to.eq('GET');
    });

    it('should send PUT', () => {
        const url = '/auth/signup';
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                first_name: '',
                second_name: '',
                login: '',
                email: '',
                password: '',
                phone: ''
            })
        };
        http.put(url, requestOptions);

        expect(requests.length).to.eq(1);
        expect(requests[0].method).to.eq('PUT');
    });
});
