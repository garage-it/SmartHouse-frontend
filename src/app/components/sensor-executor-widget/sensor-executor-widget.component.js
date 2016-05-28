import { Component } from 'angular2/core';

import BaseSensor from '../shared/base-sensor';
import template from './sensor-executor-widget.html';
import styles from './sensor-executor-widget.scss';

@Component({
    selector: 'sm-sensor-executor-widget',
    template,
    styles: [styles],
    inputs: ['device', 'description']
})
export class SensorExecutorWidget extends BaseSensor {
    ngOnInit() {
        super.ngOnInit();
        this.data = { value: true };
    }
}
