import {
    Component,
    OnInit,
    NgZone,
    ViewChild,
    ElementRef,
    Renderer,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { Router } from '@angular/router';
import { Device } from '../../shared/devices/device.model';
import { FileUploader } from 'ng2-file-upload';
import { MapViewService } from '../../home/map-view/map-view.service';
import { MapViewInfoCreateDto, MapViewInfoDto } from '../../home/map-view/map-view.dto';
import { ViewInfoDto } from '../../home/view/view.dto';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html',
    styleUrls: ['./map-constructor.style.scss']
})
export class MapConstructorComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;

    @Input() canBeActive: boolean;
    @Input() mapSubViewData: MapViewInfoCreateDto | MapViewInfoDto;

    @Output() defaultSubviewChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    set defaultSubview(value) {
        this.defaultSubviewValue = value;
        this.defaultSubviewChange.emit(value);
    };
    get defaultSubview(): string {
        return this.defaultSubviewValue;
    };

    @Output() nameChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    set name(value) {
        this.nameValue = value;
        this.nameChange.emit(value);
    };
    get name(): string {
        return this.nameValue;
    };

    @Output() descriptionChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    set description(value) {
        this.descriptionValue = value;
        this.descriptionChange.emit(value);
    };
    get description(): string {
        return this.descriptionValue;
    };

    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() saveView: EventEmitter<ViewInfoDto> = new EventEmitter<ViewInfoDto>();
    @Output() uploadPicture: EventEmitter<any> = new EventEmitter<any>();

    public uploader: FileUploader = new FileUploader({ queueLimit: 1, allowedFileType: ['image'] });
    public hasBaseDropZoneOver: boolean = false;
    public picture: any;

    private currentActive: boolean = false;
    private nameValue: string = '';
    private descriptionValue: string = '';
    private defaultSubviewValue: string = '';

    public set isActive(value: boolean) {
        this.currentActive = value;
        this.isActiveChange.emit(value);
    }

    public get isActive() {
        return this.currentActive;
    };

    private reader: FileReader = new FileReader();
    public edittedDevices: Device[] = [];

    constructor(private router: Router,
                private ngZone: NgZone,
                private renderer: Renderer,
                private mapViewService: MapViewService) {
    }

    get isReUploadDisabled(): boolean {
        return !this.picture;
    }

    public ngOnInit(): void {
        if (Object.keys(this.mapSubViewData).length !== 0) {
            this.initializeEditedView(this.mapSubViewData);
        }

        /* workaround, because handler code is executed outside of Angular Zone ('this' references to the wrong object) */
        this.uploader.onAfterAddingFile = this.ngZone.run(() => (fileItem: any) => {
            fileItem.withCredentials = false;
            this.reader.readAsDataURL(fileItem._file);
        });

        this.uploader.onCompleteAll = () => this.onCreateSuccess();

        this.reader.onload = this.ngZone.run(() => (event: any) => {
            this.picture = event.target.result;
            this.uploadPicture.emit(this.uploader);
        });
    }

    private initializeEditedView(mapView): void {
        this.picture = mapView.pictureName && this.mapViewService.resolvePictureUrl(mapView);
        this.edittedDevices = mapView.sensors.map(sensor => {
            sensor.sensor.posX = sensor.position && sensor.position.x;
            sensor.sensor.posY = sensor.position && sensor.position.y;
            return sensor.sensor;
        });
    }

    private onCreateSuccess(): void {
        this.router.navigate(['..']);
    }

    sensorIsUnique(sensor: Device): boolean {
        return this.edittedDevices
            .some(s => s._id === sensor._id);
    }

    public onAddSensor(sensor: Device): void {
        if (this.picture) {
            if (!this.sensorIsUnique(sensor)) {
                this.edittedDevices.push(sensor);
                this.updateEdittedSensors();
            }
        }
    }

    public onRemoveSensor(sensor: Device): void {
        if (this.picture) {
            this.edittedDevices = this.edittedDevices.filter(s => s._id !== sensor._id);
            this.updateEdittedSensors();
        }
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public onUploadClick() {
        this.uploader.clearQueue();
        const event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
    }

    public onDeviceMoved(): void {
        this.updateEdittedSensors();
    }

    public onSubmit(): void {
        this.saveView.emit();
    }

    private updateEdittedSensors(): void {
        this.mapSubViewData['sensors'] = this.edittedDevices.map(({ _id, posX, posY }) => {
            return {
                sensor: _id,
                position: {
                    x: posX,
                    y: posY
                }
            };
        });
    }
}
