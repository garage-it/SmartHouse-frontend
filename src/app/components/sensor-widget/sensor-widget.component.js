import {Component, Injectable} from 'angular2/core';
import SensorWidgetService from './sensor-widget.service';
import template from './sensor-widget.html';
import style from './sensor-widget.scss';

@Component({
    selector: 'sm-sensor-widget',
    template,
    styles: [style],
    providers: [SensorWidgetService],
    inputs: ['device', 'description']
})
@Injectable()
export class SensorWidget {
    constructor(sensorWidgetService: SensorWidgetService) {
        this.sensorWidgetService = sensorWidgetService;
    }

    ngOnInit() {
        this.data = {};

        this.sensorWidgetService
            .subscribe(this.device, data => {
                this.data = data;
            });
    }

    ngOnDestroy() {
        this.sensorWidgetService
            .unsubscribe(this.device);
    }
}
