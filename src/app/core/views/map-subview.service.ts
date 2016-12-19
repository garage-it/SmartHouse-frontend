import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ShHttpService } from '../sh-http/sh-http.service';
import {
    MapSubviewDto,
    MapSubviewCreateDto
} from './map-subview.dto';
import { FilesService } from '../files/files.service';
import { RequestOptions } from '@angular/http';

@Injectable()
export class MapSubviewService {

    constructor(private http: ShHttpService,
                private filesService: FilesService,
                private requestOptions: RequestOptions) {
    }

    public create(dto: MapSubviewCreateDto): Observable<MapSubviewDto> {
        return this.http.post('/map-view', dto);
    }

    public resolvePictureUploadUrl({ _id }: MapSubviewDto): string {
        return this.requestOptions.merge({ url: `/map-view/${_id}/picture` }).url;
    }

    public resolvePictureUrl({ pictureName }: MapSubviewDto): string {
        return this.filesService.resolveFileUrl(pictureName);
    }
}
