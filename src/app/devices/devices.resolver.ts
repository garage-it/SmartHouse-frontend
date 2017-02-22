import { Injectable } from '@angular/core';

import { DevicesService } from './devices.service';
import { Resolve } from '@angular/router';

@Injectable()
export class DeviceListResolver implements Resolve<Object> {
    constructor(private devicesService: DevicesService) {}

    resolve() {
        return this.devicesService.getSensors();
    }
}
