import {Injectable} from 'angular2/core';
import ShHttpService from '../../sh-http/sh-http.service.js';

@Injectable()
export class DeviceListService {
    constructor(http: ShHttpService) {
        this.http = http;
    }

    getSensors() {
        return this.http.get('/sensors');
    }
}
