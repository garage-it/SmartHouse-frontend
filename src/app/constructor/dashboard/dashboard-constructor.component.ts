import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../shared/devices/device.model';
import { DashboardViewInfoDto } from '../../home/dashboard-view/dashboard-view.dto';
import { ViewInfoDto } from '../../home/view/view.dto';

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

    @Output() dashboardSubviewChange: EventEmitter<DashboardViewInfoDto> = new EventEmitter<DashboardViewInfoDto>();
    @Input()
    set dashboardSubview(dashboardViewInfoDto) {
        console.log('dashboardSubviewChange', dashboardViewInfoDto);
        this.dashboardSubviewValue = dashboardViewInfoDto;
        this.dashboardSubviewChange.emit(dashboardViewInfoDto);
    }
    get dashboardSubview(): DashboardViewInfoDto {
        return this.dashboardSubviewValue;
    }

    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() saveView: EventEmitter<ViewInfoDto> = new EventEmitter<ViewInfoDto>();

    public selectedDevices: Device[] = [];

    private activeState: boolean = false;
    private defaultSubviewValue: string = '';
    private dashboardSubviewValue: DashboardViewInfoDto = null;

    public set isActive(value: boolean) {
        this.activeState = value;
        this.isActiveChange.emit(value);
    }

    public get isActive() {
        return this.activeState;
    };

    public ngOnInit(): void {
        if (this.dashboardSubview && this.dashboardSubview.devices) {
            this.selectedDevices = this.dashboardSubview.devices;
        }
    }

    public onAddDevice(device): void {
        this.selectedDevices.push(device);
        this.storeDevices();
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
