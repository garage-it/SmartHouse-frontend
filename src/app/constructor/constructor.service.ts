import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShHttpService } from '../core/sh-http/sh-http.service';
import { ViewInfoDto } from '../shared/view/view.dto';

@Injectable()
export class ConstructorService {

    constructor(
        private http: ShHttpService) {
    }

    public createOrUpdate(data: ViewInfoDto): Observable<any> {
        let url = '/views';
        if (data._id != null) {
            url += `/${data._id}`;
        }

        return this.http.post(url, data);
    }

    public getView(viewId: string): Observable<any> {
        return this.http.get(`/views/${viewId}`);
    }
}
