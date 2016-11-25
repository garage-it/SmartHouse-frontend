import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../devices/device.model';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html',
    styleUrls: [ './map-constructor.style.scss' ]
})
export class MapConstructorComponent {
    public uploader: FileUploader = new FileUploader({ queueLimit: 1, allowedFileType: ['image'] });
    public hasBaseDropZoneOver: boolean = false;
    public picture: any;

    private reader: FileReader = new FileReader();
    private sensors: Device[] = [];

    constructor(private route: ActivatedRoute, private ngZone: NgZone) { }

    public ngOnInit(): void {
        this.sensors = this.route.snapshot.data['sensors'];

        let self = this;

        /* workaround, because handler code is executed outside of Angular Zone ('this' references to the wrong object) */
        this.uploader.onAfterAddingFile = this.ngZone.run(() => function (fileItem: any) {
            self.reader.readAsDataURL(fileItem._file);
            this.removeFromQueue(fileItem);
        });

        this.reader.onload = this.ngZone.run(() => function (event: any) {
            self.picture = event.target.result;
        });
    }

    public onAddSensor(sensor: Device): void { }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}
