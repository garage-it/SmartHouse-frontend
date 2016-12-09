import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Device } from '../../settings/devices/device.model';

@Component({
    selector: 'sh-sensors-list',
    templateUrl: './sensors-list.template.html',
    styleUrls: ['./sensors-list.style.scss']
})
export class SensorsListComponent {

    @Input() sensors: Device[];
    @Input() mappedSensors: Device[];
    @Output() onAddSensor: EventEmitter<any> = new EventEmitter();
    @Output() onRemoveSensor: EventEmitter<any> = new EventEmitter();

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
