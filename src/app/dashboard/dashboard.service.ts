import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../shared/sh-http/sh-http.service';
import { ShHttpUtilsService } from '../shared/sh-http/sh-http-utils.service';
import { IWidget } from './dashboard.interfaces';

@Injectable()
export class DashboardService {
    constructor(private http: ShHttpService, private httpUtils: ShHttpUtilsService) { }

    getWidgets(): Observable<any> {
        return this.http.get('/dashboard')
            .catch(error => {
                return this.httpUtils.extractErrorMessage(error);
            });
    }

    applyChanges(devices: IWidget[]): Observable<any> {
        return this.http.put('/dashboard', {devices});
    }

    compareWidgetsLists(initialWidgets: IWidget[], updatedWidgets: IWidget[]): boolean {
        return updatedWidgets.some((updatedWidget, i) => {
            const updatedWidgetProperties = Object.keys(updatedWidget);
            const areSimilarWidgets = updatedWidgetProperties
                .every(prop => initialWidgets[i][prop] === updatedWidget[prop]);

            return areSimilarWidgets;
        });
    }
}
