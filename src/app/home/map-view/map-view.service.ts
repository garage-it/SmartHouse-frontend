import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShHttpService } from '../../core/sh-http/sh-http.service';
import { MapViewInfoDto, MapViewInfoCreateDto } from './map-view.dto';
import { FilesService } from '../../core/files/files.service';
import { RequestOptions } from '@angular/http';

@Injectable()
export class MapViewService {

    constructor(private http: ShHttpService,
                private filesService: FilesService,
                private requestOptions: RequestOptions) {
    }

    public create(dto: MapViewInfoCreateDto): Observable<MapViewInfoDto> {
        return this.http.post('/map-view', dto);
    }

    public resolvePictureUploadUrl({ _id }: MapViewInfoDto): string {
        debugger;
        return this.requestOptions.merge({ url: `/map-view/${_id}/picture` }).url;
    }

    public resolvePictureUrl({ pictureName }: MapViewInfoDto): string {
        return this.filesService.resolveFileUrl(pictureName);
    }
}
