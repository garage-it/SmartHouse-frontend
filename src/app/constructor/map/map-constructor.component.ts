import { Component, OnInit, NgZone } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html',
    styleUrls: [ './map-constructor.style.scss' ]
})
export class MapConstructorComponent implements OnInit {
    public uploader: FileUploader = new FileUploader({ queueLimit: 1, allowedFileType: ['image'] });
    public hasBaseDropZoneOver: boolean = false;
    public picture: any;
    private reader: FileReader = new FileReader();

    public ngOnInit() {
        let self = this;

        /* workaround, because handler code is executed outside of Angular Zone ('this' references to the wrong object) */
        this.uploader.onAfterAddingFile = this.ngZone.run(() => function (fileItem: any) {
            self.reader.readAsDataURL(fileItem._file);
            (this as FileUploader).removeFromQueue(fileItem);
        });

        this.reader.onload = this.ngZone.run(() => function (event: any) {
            self.picture = event.target.result;
        });
    }

    constructor(private ngZone: NgZone) { }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}
