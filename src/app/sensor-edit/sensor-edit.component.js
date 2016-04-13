import {Component} from 'angular2/core';
import template from './sensor-edit.html';

const selector = 'sh-sensor-edit';

@Component({
    selector,
    template
})
export class SensorEdit {
    ngOnInit() {
        console.log('Init sensor-edit'); // eslint-disable-line
    }
}
