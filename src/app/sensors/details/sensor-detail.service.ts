import {Injectable} from 'angular2/core';
import ShHttpService from '../../sh-http/sh-http.service';

@Injectable()
export default class SensorDetailService {
    http: any;

    constructor(http:ShHttpService) {
        this.http = http;
    }

    get(id = '') {
        return this.http.get(`/sensors/${id}`);
    }

    save(sensor) {
        return this.http.post('/sensors', sensor);
    }

    update(sensor) {
        return this.http.put(`/sensors/${sensor._id}`, sensor);
    }

    delete(sensor) {
        return this.http.delete(`/sensors/${sensor._id}`, sensor);
    }
}
