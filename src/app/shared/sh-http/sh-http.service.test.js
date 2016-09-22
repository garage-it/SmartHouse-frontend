import {async, TestBed} from '@angular/core/testing';

import { ShHttpService } from './sh-http.service.js';
import { ShRequestOptions } from './sh-request-options';

import { Http, RequestMethod, Headers } from '@angular/http';

class ObservableSubscribe {
    constructor(data = {}) {
        this._data = data;
        this._data.json = () => {};
    }
    map(fn) {
        fn(this._data);
    }
}

class HttpMock {
    get() { return new ObservableSubscribe(); }
    post() { return new ObservableSubscribe(); }
    put() { return new ObservableSubscribe(); }
    delete() { return new ObservableSubscribe(); }
}

describe('ShHttpService', () => {
    let sut;
    let httpMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: Http, useClass: HttpMock },
                ShHttpService
            ]
        })
        .compileComponents()
        .then(() => {
            httpMock = TestBed.get(Http);
            spyOn(httpMock, 'get').and.callThrough();
            spyOn(httpMock, 'post').and.callThrough();
            spyOn(httpMock, 'put').and.callThrough();
            spyOn(httpMock, 'delete').and.callThrough();
            sut = TestBed.get(ShHttpService);
        });

    }));

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should get sensor data from the server', () => {
        const urlMock = 'mock';
        let options = new ShRequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        options = options.merge({
            method: RequestMethod.Get,
            url: urlMock
        });
        sut.get(urlMock);
        expect(httpMock.get).toHaveBeenCalledWith(urlMock, options);
    });

    it('should create new item', () => {
        const urlMock = 'mock';
        const bodyMock = {};
        let options = new ShRequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        options = options.merge({
            method: RequestMethod.Post,
            url: urlMock
        });
        sut.post(urlMock, bodyMock);
        expect(httpMock.post).toHaveBeenCalledWith(urlMock, JSON.stringify(bodyMock), options);
    });

    it('should update sensor', () => {
        const urlMock = 'mock';
        const bodyMock = {};
        let options = new ShRequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        options = options.merge({
            method: RequestMethod.Put,
            url: urlMock
        });
        sut.put(urlMock, bodyMock);
        expect(httpMock.put).toHaveBeenCalledWith(urlMock, JSON.stringify(bodyMock), options);
    });

    it('should remove item', () => {
        const urlMock = 'mock';
        let options = new ShRequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        options = options.merge({
            method: RequestMethod.Delete,
            url: urlMock
        });
        sut.delete(urlMock);
        expect(httpMock.delete).toHaveBeenCalledWith(urlMock, options);
    });
});
