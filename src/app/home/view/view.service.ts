import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShHttpService } from '../../core/sh-http/sh-http.service';
import { ViewInfoDto } from './view.dto';

@Injectable()
export class ViewService {

    constructor(private http: ShHttpService) {
    }

    public create(dto: ViewInfoDto): Observable<ViewInfoDto> {
        return this.http.post('/views', dto);
    }
}
