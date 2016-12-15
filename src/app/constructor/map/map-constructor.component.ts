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

import { ActivatedRoute, Router } from '@angular/router';
import { Device } from '../../shared/devices/device.model';
import { FileUploader } from 'ng2-file-upload';
import { DevicesComponent } from '../devices/devices.component';
import { MapViewService } from '../../home/map-view/map-view.service';
import { MapViewInfoCreateDto } from '../../home/map-view/map-view.dto';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewInfoDto } from '../../home/view.dto';

@Component({
    selector: 'sh-map-constructor',
    templateUrl: './map-constructor.template.html',
    styleUrls: ['./map-constructor.style.scss']
})
export class MapConstructorComponent implements OnInit {
    @ViewChild(DevicesComponent) devicesComponent;
    @ViewChild('fileInput') fileInput: ElementRef;

    @Input() canBeActive: boolean;
    @Input() default: string;
    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() isDefaultChange: EventEmitter<string> = new EventEmitter<string>();

    public uploader: FileUploader = new FileUploader({ queueLimit: 1, allowedFileType: ['image'] });
    public hasBaseDropZoneOver: boolean = false;
    public picture: any;
    public name: string = '';
    public description: string = '';

    private currentActive: boolean = false;

    public set isActive(value: boolean) {
        this.currentActive = value;
        this.isActiveChange.emit(value);
    }

    public get isActive() {
        return this.currentActive;
    };

    public set isDefault(value: string) {
        this.isDefaultChange.emit(value);
    }

    private reader: FileReader = new FileReader();
    private sensors: Device[] = [];
    private mappedSensors: Device[] = [];
    public view: ViewInfoDto;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private toastr: ToastsManager,
                private renderer: Renderer,
                private mapViewService: MapViewService) {
    }

    get isReUploadDisabled(): boolean {
        return !this.picture;
    }

    public ngOnInit(): void {
        this.sensors = this.route.snapshot.data['sensors'];
        this.view = this.route.snapshot.data['view'];
        if (this.view) {
            this.initializeEditedView(this.view);
        }

        /* workaround, because handler code is executed outside of Angular Zone ('this' references to the wrong object) */
        this.uploader.onAfterAddingFile = this.ngZone.run(() => (fileItem: any) => {
            fileItem.withCredentials = false;
            this.reader.readAsDataURL(fileItem._file);
        });

        this.uploader.onCompleteAll = () => this.onCreateSuccess();

        this.reader.onload = this.ngZone.run(() => (event: any) => {
            this.picture = event.target.result;
        });
    }

    private initializeEditedView(view: ViewInfoDto): void {
        if (view.mapView) {
            this.name = view.mapView.name;
            this.description = view.mapView.description;
            this.picture = this.mapViewService.resolvePictureUrl(view.mapView);
        }
        if (view.dashboard) {
            this.mappedSensors = view.dashboard.devices;
        }
    }

    private onCreateSuccess(): void {

        this.router.navigate(['..']);
    }

    public onMappedSensors(sensors: Device[]): void {
        this.mappedSensors = sensors;
        this.ngZone.run(() => {
        });
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

    public onUploadClick() {
        this.uploader.clearQueue();
        const event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
    }

    public onSubmit(): void {
        if (!this.isMapViewCanBeSaved()) {
            this.toastr.error('Please fill mandatory fields: "Name", "Description" and "Add Picture"');
            return;
        }
        const mapViewInfoCreateDto: MapViewInfoCreateDto = {
            name: this.name,
            description: this.description,
            active: this.isActive,
            default: this.default === 'Map',
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

    private isMapViewCanBeSaved(): boolean {
        return this.name
            && this.description
            && this.picture;
    }
}
