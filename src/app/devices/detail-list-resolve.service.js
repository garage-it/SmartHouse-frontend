import { SensorDetailService } from './shared/sensor-detail.service';

export class DeviceListResolveService {
    constructor(sensorsService: SensorDetailService) {
        this.sensorsService = sensorsService;
    }

    resolve() {
        return this.sensorsService.get();
    }
}
