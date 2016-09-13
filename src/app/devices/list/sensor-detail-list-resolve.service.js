import SensorDetailService from '../details/sensor-detail.service';
import { Observable } from 'rxjs/Observable';

export class SensorDetailListResolveService {
    constructor(sensorsService: SensorDetailService) {
        this.sensorsService = sensorsService;
    }

    resolve(): Observable<any> {
        return this.sensorsService.get();
    }
}
