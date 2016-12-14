import { Component, Input } from '@angular/core';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

@Component({
    selector: 'sh-sensor-status-widget',
    templateUrl: './sensor-status-widget.template.html',
    styleUrls: [
        '../sensor-widget/sensor-widget.template.scss',
        './sensor-status-widget.style.scss'
    ]
})
export class SensorStatusWidgetComponent extends BaseSensor {

    @Input() device;

}
