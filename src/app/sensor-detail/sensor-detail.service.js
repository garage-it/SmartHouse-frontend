import {Injectable} from 'angular2/core';
import {Http, RequestOptions, Headers} from 'angular2/http';

@Injectable()
export default class SensorDetailService {
    constructor(http:Http) {
        this.http = http;
        this.baseUrl = 'api/sensor';
    }

    get(id) {
        return this.http
            .get(`${this.baseUrl}/get/${id}`)
            .map(this.convertToJson);
    }

    save(sensor) {
        const body = JSON.stringify(sensor);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
        return this.http
            .post(`${this.baseUrl}/save`, body, options)
            .map(this.convertToJson);
    }

    convertToJson(data) {
        console.log(data);// eslint-disable-line
        return data.json();
    }
}
