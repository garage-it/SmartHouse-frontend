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
    private sensors: Device[] = [];

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.widgets = this.route.snapshot.data['widgets'];
        const widgetsIds = this.widgets.map(widget => widget.mqttId);

        this.sensors = this.route.snapshot.data['sensors']
            .filter(device => !(widgetsIds.indexOf(device.mqttId) + 1));
    }

    onAddSensor(sensor): void {
        this.widgets.push(sensor);
        this.sensors = this.sensors.filter(filteredSensor => filteredSensor.mqttId !== sensor.mqttId);
    }

    onRemoveWidget(widget): void {
        this.widgets = this.widgets.filter(filteredWidget => filteredWidget.mqttId !== widget.mqttId);
        this.sensors.push(widget);
    }
}
