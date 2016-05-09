import {Injectable} from 'angular2/core';
import ShHttpService from '../helpers/sh-http.service.js';

@Injectable()
export default class SensorDetailService {
    constructor(http: ShHttpService) {
        this.http = http;
    }
    get(id) {
        return this.http
            .get(`/sensors/${id}`)
            .map(this.convertToJson);
    }

    save(sensor) {
        return this.http
            .put(`/sensors/${sensor._id}`, sensor)
            .map(this.convertToJson);
    }

    convertToJson(data) {
        console.log(data);// eslint-disable-line
        return data.json();
    }
}
