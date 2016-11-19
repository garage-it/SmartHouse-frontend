import { Component, Input } from '@angular/core';

@Component({
    selector: 'sh-sensor-widget',
    templateUrl: './sensor-widget.template.html'
})
export class SensorWidgetComponent {
    @Input() device;
}
