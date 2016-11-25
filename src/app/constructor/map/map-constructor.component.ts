import { Component, NgZone } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
// import { FileItem } from './../../../../node_modules/ng2-file-upload/file-upload/file-item.class';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html',
    styleUrls: [ './map-constructor.style.scss' ]
})
export class MapConstructorComponent {
    public uploader: FileUploader = new FileUploader({ queueLimit: 1 });
    public hasBaseDropZoneOver: boolean = false;
    public picture: any;
    private reader: FileReader = new FileReader();

    constructor(private ngZone: NgZone) {
        let self = this;

        this.uploader.onAfterAddingFile = this.ngZone.run(() => function (fileItem: any) { // TODO: must be [fileItem: FileItem]
            self.reader.readAsDataURL(fileItem._file);
            this.removeFromQueue(fileItem);
        });

        this.reader.onload = this.ngZone.run(() => function (event: any) {
            self.picture = event.target.result;
        });
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}
