import { Component, Input } from '@angular/core';

import { BaseSensor } from '../shared/base-sensor/base-sensor';

@Component({
    selector: 'sm-sensor-status-widget',
    templateUrl: './sensor-status-widget.template.html',
    styleUrls: ['../shared/sensor-widget/sensor-widget.style.scss',
        './sensor-status-widget.style.scss']
})
export class SensorStatusWidgetComponent extends BaseSensor {

    @Input() device;

}
