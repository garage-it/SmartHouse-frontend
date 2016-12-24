import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShHttpService } from '../core/sh-http/sh-http.service';
import { ViewInfoDto } from '../shared/view/view.dto';
import { DialogService } from '../shared/dialog/dialog.service';

@Injectable()
export class ConstructorService {

    constructor(
        private http: ShHttpService,
        private dialogService: DialogService
    ) {}

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

    public confirm(): Observable<any> {
        return this.dialogService.confirm(null, {
            title: '',
            message: 'Do you want to save and exit?',
            ok: 'Yes',
            cancel: 'No'
        });
    }
}
