import { Component } from '@angular/core';
import { ViewInfoDto } from '../home/view/view.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewService } from '../home/view/view.service';
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
        private viewService: ViewService,
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
        this.canBeDashboardActive = !value;
    }

    public onDashboardActiveChanged(value: boolean) {
        this.canBeMapActive = !value;
    }

    public onSaveView(): void {
        if (!this.isViewCanBeSaved()) {
            this.toastr.error('Please fill mandatory fields: "Name", "Description" and "Add Picture" or "Dashboard"');
            return;
        }
        this.viewService.create(this.view).subscribe(({mapSubview}) => {
            if (this.uploader) {
                return this.uploadPicture(mapSubview);
            }
            this.router.navigate(['..']);
        });
    }

    public onUploadPicture(uploader: FileUploader) {
        this.uploader = uploader;
    }

    private isViewCanBeSaved(): boolean {
        return this.view.name
            && this.view.description
            && this.isAnySubviewExists();
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
