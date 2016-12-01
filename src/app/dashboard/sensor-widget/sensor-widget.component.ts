import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'sh-sensor-widget',
    templateUrl: './sensor-widget.template.html',
    styleUrls: ['./sensor-widget.template.scss']
})
export class SensorWidgetComponent {
    @Input() device;
    @Output() onRemoveWidget: EventEmitter<any> = new EventEmitter();

    removeWidget(): void {
        this.onRemoveWidget.emit(this.device);
    }
}
