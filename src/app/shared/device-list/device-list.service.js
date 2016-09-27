import {Injectable} from '@angular/core';
import ShHttpService from '../../shared/sh-http/sh-http.service.js';

@Injectable()
export class DeviceListService {
    constructor(http: ShHttpService) {
        this.http = http;
    }

    getSensors() {
        return this.http.get('/sensors');
    }
}
