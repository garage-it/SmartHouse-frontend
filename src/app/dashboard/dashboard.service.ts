import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../shared/sh-http/sh-http.service';

@Injectable()
export class DashboardService {
    constructor(private http: ShHttpService) { }

    private handleError (error: Response | any) {
        let errorMesssage: string;

        if (error instanceof Response) {
            const body = error.json() || '';

            errorMesssage = body.message || 'Unknown error';
        } else {
            errorMesssage = 'Unknown error';
        }

        return Observable.throw(errorMesssage);
    }

    getWidgets() {
        return this.http.get('/dashboard')
            .catch(this.handleError);
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
