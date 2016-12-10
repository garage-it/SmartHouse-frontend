import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../settings/devices/device.model';

@Component({
    selector: 'sh-dashboard-constructor',
    templateUrl: './dashboard-constructor.template.html',
    styleUrls: ['./dashboard-constructor.style.scss']
})
export class DashboardConstructorComponent {

    private widgets: Device[] = [];
    private sensors: Device[] = [];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.sensors = this.route.snapshot.data['sensors'];
    }

    onAddSensor(sensor): void {
        this.widgets.push(sensor);
    }

    onRemoveSensor(widget: Device): void {
        this.widgets = this.widgets.filter(filteredWidget => filteredWidget.mqttId !== widget.mqttId);
    }

    onRemoveWidget(widget: Device): void {
        this.widgets = this.widgets.filter(filteredWidget => filteredWidget.mqttId !== widget.mqttId);
    }
}
