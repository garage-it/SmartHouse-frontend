import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../../shared/devices/device.model';

@Component({
    selector: 'sh-dashboard-constructor',
    templateUrl: './dashboard-constructor.template.html',
    styleUrls: ['./dashboard-constructor.style.scss']
})
export class DashboardConstructorComponent {
    @Input() canBeActive: boolean;
    @Output() isActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private widgets: Device[] = [];
    private sensors: Device[] = [];

    private activeState: boolean = false;
    public set isActive(value: boolean) {
        this.activeState = value;
        this.isActiveChange.emit(value);
    }
    public get isActive() { return this.activeState; };

    constructor(private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.sensors = this.route.snapshot.data['sensors'];
    }

    public onAddSensor(sensor): void {
        this.widgets.push(sensor);
    }

    public onRemoveSensor(widget: Device): void {
        this.widgets = this.widgets.filter(filteredWidget => filteredWidget.mqttId !== widget.mqttId);
    }

    public onRemoveWidget(widget: Device): void {
        this.widgets = this.widgets.filter(filteredWidget => filteredWidget.mqttId !== widget.mqttId);
    }
}
