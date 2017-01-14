import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Device } from '../../devices/device.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sh-sensors-list',
    templateUrl: './sensors-list.template.html',
    styleUrls: ['./sensors-list.style.scss']
})
export class SensorsListComponent {

    @Input() mappedSensors: Device[];
    @Output() onAddSensor: EventEmitter<any> = new EventEmitter();
    @Output() onRemoveSensor: EventEmitter<any> = new EventEmitter();
    public devices: Device[];

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.devices = this.route.snapshot.data['sensors'];
    }

    addSensor(sensor): void {
        this.onAddSensor.emit(sensor);
    }

    removeSensor(sensor): void {
        this.onRemoveSensor.emit(sensor);
    }

    isSensorOnView(sensor: Device): boolean {
        return this.mappedSensors
            .some(s => s._id === sensor._id);
    }
}
