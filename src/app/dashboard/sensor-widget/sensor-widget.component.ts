import {Component, Input} from '@angular/core';

@Component({
    selector: 'sm-sensor-widget',
    templateUrl: './sensor-widget.template.html'
})
export class SensorWidgetComponent {
    @Input() device;
}
