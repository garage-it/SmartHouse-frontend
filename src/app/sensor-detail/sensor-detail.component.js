import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';

import Sensor from './sensor';
import template from './sensor-detail.html';

const selector = 'sh-sensor-detail';

@Component({
    selector,
    template
})
export class SensorDetail {
    constructor(id) {
        if (!id) {
            return this.sensor = new Sensor();
        }
        this.getSensorDetail(id);
    }

    ngOnInit() {
        console.log('Init sensor-detail'); // eslint-disable-line
    }

    getSensorDetail(id) {

    }

    save() {
        console.log(this.sensor);
    }
}
