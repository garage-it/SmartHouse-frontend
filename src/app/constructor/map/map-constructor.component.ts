import {Component, OnInit, NgZone, ContentChildren, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../devices/device.model';
import { FileUploader } from 'ng2-file-upload';
import {DevicesComponent} from '../devices/devices.component';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html',
    styleUrls: [ './map-constructor.style.scss' ]
})
export class MapConstructorComponent implements OnInit {
    @ViewChild(DevicesComponent) devicesComponent;
    public uploader: FileUploader = new FileUploader({ queueLimit: 1, allowedFileType: ['image'] });
    public hasBaseDropZoneOver: boolean = false;
    public picture: any;

    private reader: FileReader = new FileReader();
    private sensors: Device[] = [];
    private mappedSensors: Device[] = [];

    constructor(private route: ActivatedRoute, private ngZone: NgZone) { }

    public ngOnInit(): void {
        this.sensors = this.route.snapshot.data['sensors'];

        /* workaround, because handler code is executed outside of Angular Zone ('this' references to the wrong object) */
        this.uploader.onAfterAddingFile = this.ngZone.run(() => (fileItem: any) => {
            this.reader.readAsDataURL(fileItem._file);
            this.uploader.removeFromQueue(fileItem);
        });

        this.reader.onload = this.ngZone.run(() => (event: any) => {
            this.picture = event.target.result;
        });
    }

    public onMappedSensors(sensors: Device[]): void {
        this.mappedSensors = sensors;
        this.ngZone.run(() => {});
    }

    public onAddSensor(sensor: Device): void {
        if (this.picture) {
            this.devicesComponent.addSensor(sensor);
        }
    }

    public onRemoveSensor(sensor: Device): void {
        if (this.picture) {
            this.devicesComponent.removeSensor(sensor);
        }
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }
}
