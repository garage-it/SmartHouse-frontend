import {Injectable} from 'angular2/core';
import ShHttpService from '../sh-http/sh-http.service.js';

@Injectable()
export default class SensorDetailService {
    constructor(http:ShHttpService) {
        this.http = http;
    }

    get(id) {
        return this.http.get(`/sensors/${id}`);
    }

    save(sensor, update) {
        return !update ?
            this.http.post('/sensors', sensor) :
            this.http.put(`/sensors/${sensor._id}`, sensor);
    }
}
