import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';

@Injectable()
export class FilesService {

    constructor(private requestOptions: RequestOptions) {
    }

    public resolveFileUrl(fileName: string): string {
        return this.requestOptions.merge({ url: `files/${fileName}` }).url;
    }
}
