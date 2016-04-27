import {Injectable} from 'angular2/core';
import ShHttp from '../sh-http';

@Injectable()
export default class SensorDetailService {
    constructor(http: ShHttp) {
        this.http = http;
    }
    get(id) {
        return this.http
            .get(`/sensors/${id}`)
            .map(this.convertToJson);
    }

    save(sensor) {
        const body = JSON.stringify(sensor);
        return this.http
            .put(`/sensors/${sensor._id}`, body)
            .map(this.convertToJson);
    }

    convertToJson(data) {
        console.log(data);// eslint-disable-line
        return data.json();
    }
}
