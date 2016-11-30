import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../../devices/device.model';
import { FileUploader } from 'ng2-file-upload';
import { DevicesComponent } from '../devices/devices.component';
import { MapViewService } from '../../home/map-view/map-view.service';
import { MapViewInfoCreateDto } from '../../home/map-view/map-view.dto';

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
    public mapViewName: string = '';
    public mapViewDescription: string = '';
    public mapViewIsActive: boolean = false;

    private reader: FileReader = new FileReader();
    private sensors: Device[] = [];
    private mappedSensors: Device[] = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private mapViewService: MapViewService) { }

    public ngOnInit(): void {
        this.sensors = this.route.snapshot.data['sensors'];

        /* workaround, because handler code is executed outside of Angular Zone ('this' references to the wrong object) */
        this.uploader.onAfterAddingFile = this.ngZone.run(() => (fileItem: any) => {
            fileItem.withCredentials = false;
            this.reader.readAsDataURL(fileItem._file);
        });

        this.uploader.onCompleteAll = () => this.whenSuccess();

        this.reader.onload = this.ngZone.run(() => (event: any) => {
            this.picture = event.target.result;
        });
    }

    private whenSuccess(): void {
        this.router.navigate(['..']);
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

    public saveMapView(): void {
        const mapViewInfoCreateDto: MapViewInfoCreateDto = {
            name: this.mapViewName,
            description: this.mapViewDescription,
            active: this.mapViewIsActive,
            sensors: this.devicesComponent.sensors.map(({ _id, posX, posY }) => {
                return {
                    sensor: _id,
                    position: {
                        x: posX,
                        y: posY
                    }
                };
            })
        };

        this.mapViewService.create(mapViewInfoCreateDto)
            .subscribe((mapViewInfoDto) => {
                this.uploader.setOptions({
                    url: this.mapViewService.resolvePictureUploadUrl(mapViewInfoDto)
                });
                this.uploader.uploadAll();
        });
    }
}
