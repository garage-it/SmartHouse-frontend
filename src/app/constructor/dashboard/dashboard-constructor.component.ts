import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../shared/devices/device.model';
import { DashboardViewInfoDto } from '../../home/dashboard-view/dashboard-view.dto';

@Component({
    selector: 'sh-dashboard-constructor',
    templateUrl: './dashboard-constructor.template.html',
    styleUrls: ['./dashboard-constructor.style.scss']
})
export class DashboardConstructorComponent {
    @Input() canBeActive: boolean;
    @Input() default: string;
    @Input() dashboardSubView: DashboardViewInfoDto;
    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() isDefaultChange: EventEmitter<string> = new EventEmitter<string>();

    public devices: Device[] = [];
    public selectedDevices: Device[] = [];

    private activeState: boolean = false;

    public set isActive(value: boolean) {
        this.activeState = value;
        this.isActiveChange.emit(value);
    }

    public get isActive() {
        return this.activeState;
    };

    public set isDefault(value: string) {
        this.isDefaultChange.emit(value);
    }

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.devices = this.route.snapshot.data['sensors'];
        if (this.dashboardSubView && this.dashboardSubView.devices) {
            this.selectedDevices = this.dashboardSubView.devices;
        }
    }

    public onAddDevice(device): void {
        this.selectedDevices.push(device);
    }

    public onRemoveDevice(device: Device): void {
        this.selectedDevices = this.selectedDevices.filter(filteredWidget => filteredWidget.mqttId !== device.mqttId);
    }

    public onRemoveSelectedDevice(device: Device): void {
        this.selectedDevices = this.selectedDevices.filter(filteredWidget => filteredWidget.mqttId !== device.mqttId);
    }
}
