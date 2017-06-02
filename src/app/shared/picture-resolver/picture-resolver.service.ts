import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

import { MapViewInfoDto } from '../view/map-view.dto';
import { FilesService } from '../../core/files/files.service';

@Injectable()
export class PictureResolverService {

    constructor(private filesService: FilesService,
                private requestOptions: RequestOptions) {
    }

    public resolvePictureUploadUrl({ _id }: MapViewInfoDto): string {
        return this.requestOptions.merge({ url: `/map-view/${_id}/picture` }).url;
    }

    public resolvePictureUrl({ pictureName }: MapViewInfoDto): string {
        return this.filesService.resolveFileUrl(pictureName);
    }
}
