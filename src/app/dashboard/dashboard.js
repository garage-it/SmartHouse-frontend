import {Component} from 'angular2/core';
import {SensorWidget} from './sensor-widget';

@Component({
    selector: 'sm-dashboard',
    directives: [SensorWidget],
    template: require('./dashboard.html')
})
export class Dashboard {}
