import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ShHttpService } from '../../core/sh-http/sh-http.service';
import { MapViewInfoDto, MapViewInfoCreateDto } from './map-view.dto';
import { FilesService } from '../../core/files/files.service';

// TODO: register in map-view module
@Injectable()
export class MapViewService {

    constructor(private http: ShHttpService,
                private filesService: FilesService) {
    }

    public create(dto: MapViewInfoCreateDto): Observable<MapViewInfoDto> {
        return this.http.post('/map-view', dto);
    }

    public resolvePictureUrl({ pictureName }: MapViewInfoDto): string {
        return this.filesService.resolveFileUrl(pictureName);
    }
}
