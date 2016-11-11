import { Injectable } from '@angular/core';
import { ShHttpService } from '../../core/sh-http/sh-http.service';

@Injectable()
export class DeviceListService {
    constructor(private http: ShHttpService) {
        this.http = http;
    }

    getSensors() {
        return this.http.get('/sensors');
    }
}
