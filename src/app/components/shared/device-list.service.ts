import {Injectable} from 'angular2/core';
import ShHttpService from '../../sh-http/sh-http.service';

@Injectable()
export class DeviceListService {
    http: any;

    constructor(http: ShHttpService) {
        this.http = http;
    }

    getSensors() {
        return this.http.get('/sensors');
    }
}
