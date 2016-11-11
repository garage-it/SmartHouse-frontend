import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ShHttpUtilsService {

    extractErrorMessage(error: Response | any): Observable<string> {
        let errorMesssage: string;

        if (error instanceof Response) {
            const errorBody = error.json() || '';

            errorMesssage = errorBody.message || 'Unknown error';
        } else {
            errorMesssage = 'Unknown error';
        }

        return Observable.throw(errorMesssage);
    }
}
