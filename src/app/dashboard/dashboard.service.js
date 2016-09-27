import {Injectable} from '@angular/core';
import ShHttpService from '../shared/sh-http/sh-http.service.js';

@Injectable()
export default class DashboardService {
    constructor(http:ShHttpService) {
        this.http = http;
    }

    getWidgets() {
        return this.http.get('/dashboard');
    }

    applyChanges(devices) {
        return this.http.put('/dashboard', {devices});
    }

    compareWidgetsLists(initial, updated) {
        for (let i = 0, l = updated.length; i < l; i++) {
            const properties = Object.keys(updated[i]);
            const different = properties.some(prop => initial[i][prop] !== updated[i][prop]);

            if (different) {
                return false;
            }
        }

        return true;
    }
}
