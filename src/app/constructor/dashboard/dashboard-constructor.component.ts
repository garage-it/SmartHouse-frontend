import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../devices/device.model';
import { DashboardViewInfoDto } from '../../shared/view/dashboard-view.dto';
import { ViewInfoDto } from '../../shared/view/view.dto';

@Component({
    selector: 'sh-dashboard-constructor',
    templateUrl: './dashboard-constructor.template.html',
    styleUrls: ['./dashboard-constructor.style.scss']
})
export class DashboardConstructorComponent {
    @Input() canBeActive: boolean;

    @Output() defaultSubviewChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    set defaultSubview(value) {
        this.defaultSubviewValue = value;
        this.defaultSubviewChange.emit(value);
    };
    get defaultSubview(): string {
        return this.defaultSubviewValue;
    };

    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() saveView: EventEmitter<ViewInfoDto> = new EventEmitter<ViewInfoDto>();

    public selectedDevices: Device[] = [];

    private defaultSubviewValue: string = '';
    @Input() dashboardSubview: DashboardViewInfoDto;

    public set isActive(value: boolean) {
        this.dashboardSubview.active = value;
        this.isActiveChange.emit(value);
    }

    public get isActive() {
        return this.dashboardSubview.active;
    };

    public ngOnInit(): void {
        if (Object.keys(this.dashboardSubview).length !== 0) {
            this.initEditedView(this.dashboardSubview);
        } else {
            this.initNewView();
        }
    }

    private initEditedView(view: DashboardViewInfoDto): void {
        if (view.devices) {
            this.selectedDevices = view.devices;
        }
    }

    private initNewView() {
        this.isActive = true;
        this.defaultSubview = 'mapSubview';
    }

    private deviceIsAdded(sensor: Device): boolean {
        return this.selectedDevices
            .some(s => s._id === sensor._id);
    }

    public onAddDevice(device): void {
        if (!this.deviceIsAdded(device)) {
            this.selectedDevices.push(device);
            this.storeDevices();
        }
    }

    public onRemoveDevice(device: Device): void {
        this.filterSelectedDevices(device);
        this.storeDevices();
    }

    public onRemoveSelectedDevice(device: Device): void {
        this.filterSelectedDevices(device);
        this.storeDevices();
    }

    public onSubmit(): void {
        this.saveView.emit();
    }

    private filterSelectedDevices(device: Device): void {
        this.selectedDevices = this.selectedDevices.filter(filteredWidget => filteredWidget.mqttId !== device.mqttId);
    }

    private storeDevices(): void {
        this.dashboardSubview['devices'] = this.selectedDevices;
    }
}
