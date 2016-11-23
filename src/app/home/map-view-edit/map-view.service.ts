import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShHttpService } from '../../core/sh-http/sh-http.service';
import { MapViewInfoDto, MapViewInfoUpdateDto, MapViewInfoCreateDto } from './map-view.dto';
import { FilesService } from '../../core/files/files.service';

@Injectable()
export class MapViewService {

    constructor(private http: ShHttpService,
                private filesService: FilesService) {
    }

    public get(): Observable<MapViewInfoDto> {
        return this.http.get('/map-view');
    }

    public save(dto: MapViewInfoUpdateDto|MapViewInfoCreateDto): Observable<MapViewInfoDto> {
        return this.http.put('/map-view', dto);
    }

    public resolvePictureUrl({ pictureName }: MapViewInfoDto): string {
        return this.filesService.resolveFileUrl(pictureName);
    }
}
