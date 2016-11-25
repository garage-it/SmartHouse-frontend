import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Device } from '../../devices/device.model';

@Component({
    selector: 'sh-sensors-list',
    templateUrl: './sensors-list.template.html',
    styleUrls: ['./sensors-list.style.scss']
})
export class SensorsListComponent {

    @Input() sensors: Device[];
    @Output() onAddSensor: EventEmitter<any> = new EventEmitter();

    addSensor(sensors): void {
        this.onAddSensor.emit(sensors);
    }
}
