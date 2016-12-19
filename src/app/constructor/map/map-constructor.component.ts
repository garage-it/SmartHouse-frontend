// TODO: Refactor with subviews
// import {
//     Component,
//     OnInit,
//     NgZone,
//     ViewChild,
//     ElementRef,
//     Renderer,
//     Input,
//     Output,
//     EventEmitter
// } from '@angular/core';
//
// import { Router } from '@angular/router';
// import { Device } from '../../shared/devices/device.model';
// import { FileUploader } from 'ng2-file-upload';
// import { MapViewService } from '../../home/map-view/map-view.service';
// import { MapViewInfoCreateDto, MapViewInfoDto } from '../../home/map-view/map-view.dto';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';
//
// @Component({
//     selector: 'sh-map-constructor',
//     templateUrl: './map-constructor.template.html',
//     styleUrls: ['./map-constructor.style.scss']
// })
// export class MapConstructorComponent implements OnInit {
//     @ViewChild('fileInput') fileInput: ElementRef;
//
//     @Input() canBeActive: boolean;
//     @Input() mapSubViewData: MapViewInfoDto;
//     @Input() default: string;
//     @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
//     @Output() isDefaultChange: EventEmitter<string> = new EventEmitter<string>();
//
//     public uploader: FileUploader = new FileUploader({ queueLimit: 1, allowedFileType: ['image'] });
//     public hasBaseDropZoneOver: boolean = false;
//     public picture: any;
//     public name: string = '';
//     public description: string = '';
//
//     private currentActive: boolean = false;
//
//     public set isActive(value: boolean) {
//         this.currentActive = value;
//         this.isActiveChange.emit(value);
//     }
//
//     public get isActive() {
//         return this.currentActive;
//     };
//
//     public set isDefault(value: string) {
//         this.isDefaultChange.emit(value);
//     }
//
//     private reader: FileReader = new FileReader();
//     public edittedDevices: Device[] = [];
//
//     constructor(private router: Router,
//                 private ngZone: NgZone,
//                 private toastr: ToastsManager,
//                 private renderer: Renderer,
//                 private mapViewService: MapViewService) {
//     }
//
//     get isReUploadDisabled(): boolean {
//         return !this.picture;
//     }
//
//     public ngOnInit(): void {
//         if (this.mapSubViewData) {
//             this.initializeEditedView(this.mapSubViewData);
//         }
//
//         /* workaround, because handler code is executed outside of Angular Zone ('this' references to the wrong object) */
//         this.uploader.onAfterAddingFile = this.ngZone.run(() => (fileItem: any) => {
//             fileItem.withCredentials = false;
//             this.reader.readAsDataURL(fileItem._file);
//         });
//
//         this.uploader.onCompleteAll = () => this.onCreateSuccess();
//
//         this.reader.onload = this.ngZone.run(() => (event: any) => {
//             this.picture = event.target.result;
//         });
//     }
//
//     private initializeEditedView(mapView: MapViewInfoDto): void {
//         this.name = mapView.name;
//         this.description = mapView.description;
//         this.picture = this.mapViewService.resolvePictureUrl(mapView);
//         this.edittedDevices = mapView.sensors.map(sensor => {
//             sensor.sensor.posX = sensor.position.x;
//             sensor.sensor.posY = sensor.position.y;
//             return sensor.sensor;
//         });
//     }
//
//     private onCreateSuccess(): void {
//         this.router.navigate(['..']);
//     }
//
//     sensorIsUnique(sensor: Device): boolean {
//         return this.edittedDevices
//             .some(s => s._id === sensor._id);
//     }
//
//     public onAddSensor(sensor: Device): void {
//         if (this.picture) {
//             if (!this.sensorIsUnique(sensor)) {
//                 this.edittedDevices.push(sensor);
//             }
//         }
//     }
//
//     public onRemoveSensor(sensor: Device): void {
//         if (this.picture) {
//             this.edittedDevices = this.edittedDevices.filter(s => s._id !== sensor._id);
//         }
//     }
//
//     public fileOverBase(e: any): void {
//         this.hasBaseDropZoneOver = e;
//     }
//
//     public onUploadClick() {
//         this.uploader.clearQueue();
//         const event = new MouseEvent('click', { bubbles: true });
//         this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
//     }
//
//     public onSubmit(): void {
//         if (!this.isMapViewCanBeSaved()) {
//             this.toastr.error('Please fill mandatory fields: "Name", "Description" and "Add Picture"');
//             return;
//         }
//         const mapViewInfoCreateDto: MapViewInfoCreateDto = {
//             name: this.name,
//             description: this.description,
//             active: this.isActive,
//             default: this.default === 'Map',
//             sensors: this.edittedDevices.map(({ _id, posX, posY }) => {
//                 return {
//                     sensor: _id,
//                     position: {
//                         x: posX,
//                         y: posY
//                     }
//                 };
//             })
//         };
//
//         this.mapViewService.create(mapViewInfoCreateDto)
//             .subscribe((mapViewInfoDto) => {
//                 this.uploader.setOptions({
//                     url: this.mapViewService.resolvePictureUploadUrl(mapViewInfoDto)
//                 });
//                 this.uploader.uploadAll();
//             });
//     }
//
//     private isMapViewCanBeSaved(): boolean {
//         return this.name
//             && this.description
//             && this.picture;
//     }
// }
