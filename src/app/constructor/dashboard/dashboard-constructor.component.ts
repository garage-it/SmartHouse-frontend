import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Device } from '../../shared/devices/device.model';
import { DashboardViewInfoDto } from '../../home/dashboard-view/dashboard-view.dto';
import { ViewInfoDto } from '../../home/view.dto';

@Component({
    selector: 'sh-dashboard-constructor',
    templateUrl: './dashboard-constructor.template.html',
    styleUrls: ['./dashboard-constructor.style.scss']
})
export class DashboardConstructorComponent {
    @Input() canBeActive: boolean;

    @Output() defaultSubviewChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() set defaultSubview(value) {
        this.defaultSubviewChange.emit(value);
    };

    @Input() dashboardSubViewData: DashboardViewInfoDto;
    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() saveView: EventEmitter<ViewInfoDto> = new EventEmitter<ViewInfoDto>();

    public selectedDevices: Device[] = [];

    private activeState: boolean = false;

    public set isActive(value: boolean) {
        this.activeState = value;
        this.isActiveChange.emit(value);
    }

    public get isActive() {
        return this.activeState;
    };

    public ngOnInit(): void {
        if (this.dashboardSubViewData && this.dashboardSubViewData.devices) {
            this.selectedDevices = this.dashboardSubViewData.devices;
        }
    }

    public onAddDevice(device): void {
        this.selectedDevices.push(device);
    }

    public onRemoveDevice(device: Device): void {
        this.filterSelectedDevices(device);
    }

    public onRemoveSelectedDevice(device: Device): void {
        this.filterSelectedDevices(device);
    }

    public onSubmit(): void {
        console.log('onSubmit dashboard-constructor');
        this.saveView.emit();
    }

    private filterSelectedDevices(device: Device): void {
        this.selectedDevices = this.selectedDevices.filter(filteredWidget => filteredWidget.mqttId !== device.mqttId);
    }
}
