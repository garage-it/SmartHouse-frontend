import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ShHttpService } from '../shared/sh-http/sh-http.service';
import { IWidget } from './dashboard.interfaces';

@Injectable()
export class DashboardService {
    constructor(private http: ShHttpService) { }

    private handleError(error: Response | any): Observable<string> {
        let errorMesssage: string;

        if (error instanceof Response) {
            const body = error.json() || '';

            errorMesssage = body.message || 'Unknown error';
        } else {
            errorMesssage = 'Unknown error';
        }

        return Observable.throw(errorMesssage);
    }

    getWidgets(): Observable<any> {
        return this.http.get('/dashboard')
            .catch(this.handleError);
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
