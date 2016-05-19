import {Injectable} from 'angular2/core';
import ShHttpService from '../../sh-http/sh-http.service.js';

@Injectable()
export class ScenarioService {
    constructor(http: ShHttpService) {
        this.http = http;
    }
    getScenarios() {
        return this.http.get('/scenarios').toPromise();
    }
}
