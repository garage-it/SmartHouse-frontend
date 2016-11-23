import { Injectable } from '@angular/core';

import { SensorDetailService } from '../shared/sensor-detail.service';
import { Resolve } from '@angular/router';

@Injectable()
export class DeviceListResolveService implements Resolve<Object> {
    constructor(private sensorsService: SensorDetailService) {}

    resolve() {
        return this.sensorsService.get();
    }
}
