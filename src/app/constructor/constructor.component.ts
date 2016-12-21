import { Component } from '@angular/core';
import { ViewInfoDto } from '../shared/view/view.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructorService } from './constructor.service';
import { ToastsManager } from 'ng2-toastr';
import { FileUploader } from 'ng2-file-upload';
import { MapViewService } from '../home/map-view/map-view.service';

@Component({
    selector: 'sh-constructor',
    templateUrl: './constructor.template.html',
    styleUrls: ['./constructor.style.scss']
})
export class ConstructorComponent {
    public canBeMapActive: boolean = true;
    public canBeDashboardActive: boolean = true;
    public uploader: FileUploader;
    public view: ViewInfoDto;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private constructorService: ConstructorService,
        private toastr: ToastsManager,
        private mapViewService: MapViewService
    ) {}

    public ngOnInit(): void {
        this.view = this.route.snapshot.data['view'] || {
                name: '',
                description: '',
                defaultSubview: 'mapSubview',
                dashboardSubview: {},
                mapSubview: {}
            };
    }

    public onMapActiveChanged(value: boolean) {
        this.canBeDashboardActive = value;
        if (!this.canBeDashboardActive) {
            this.view.defaultSubview = 'dashboardSubview';
        }
    }

    public onDashboardActiveChanged(value: boolean) {
        this.canBeMapActive = value;
        if (!this.canBeMapActive) {
            this.view.defaultSubview = 'mapSubview';
        }
    }

    public onSaveView(): void {
        if (!this.isViewCanBeSaved()) {
            this.toastr.error('Please fill mandatory fields: "Name", "Description" and "Add Picture" or "Dashboard"');
            return;
        }
        this.constructorService.createOrUpdate(this.view).subscribe(({mapSubview}) => {
            if (this.uploader) {
                return this.uploadPicture(mapSubview);
            }
            this.router.navigate(['..']);
        });
    }

    public onUploadPicture(uploader: FileUploader) {
        this.uploader = uploader;
    }

    private isEditingMode(): boolean {
        return this.view._id != null;
    }

    private isViewCanBeSaved(): boolean {
        return this.view.name
            && this.view.description
            && (this.isAnySubviewExists() || this.isEditingMode());
    }

    private isAnySubviewExists(): boolean {
        return this.isMapSubviewExists()
            || this.isDashboardSubviewExists();
    }

    private isMapSubviewExists(): boolean {
        return this.uploader
            && this.uploader.queue.length > 0;
    }

    private isDashboardSubviewExists(): boolean {
        return this.view.dashboardSubview.devices
            && this.view.dashboardSubview.devices.length > 0;
    }

    private uploadPicture(mapSubview) {
        this.uploader.setOptions({
            url: this.mapViewService.resolvePictureUploadUrl(mapSubview)
        });
        this.uploader.uploadAll();
    }
}
