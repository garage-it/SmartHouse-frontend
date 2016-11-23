import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../devices/device.model';

@Component({
    selector: 'sh-dashboard-constructor',
    templateUrl: './dashboard-constructor.template.html',
    styleUrls: ['./dashboard-constructor.style.scss']
})
export class DashboardConstructorComponent {

    private widgets: Device[] = [];
    private devices: Device[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.widgets = this.route.snapshot.data['widgets'];
        const widgetsIds = this.widgets.map(widget => widget.mqttId);

        this.devices = this.route.snapshot.data['devices']
            .filter(device => !(widgetsIds.indexOf(device.mqttId) + 1));
    }

    onAddWidget(widget): void {
        this.widgets.push(widget);
        this.devices = this.devices.filter(device => device.mqttId !== widget.mqttId);
    }

    onRemoveWidget(widget): void {
        this.widgets = this.widgets.filter(filteredWidget => filteredWidget.mqttId !== widget.mqttId);
        this.devices.push(widget);
    }
}
