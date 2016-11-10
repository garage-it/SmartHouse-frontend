import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

const template = require('./dashboard-sensor-details.template.html');
const style = require('../dashboard.style.scss');

const selector = 'dashboard-sensor-details';

@Component({
    selector,
    template,
    styles: [style]
})
export class DashboardSensorDetailsComponent {
    private defaultResolver;
    private deviceStatistic;
    private sensorId;

    constructor(private currentRoute: ActivatedRoute) {
        this.deviceStatistic = [];
    }

    ngOnInit() {
        this.sensorId = this.currentRoute.snapshot.params['id'];

        this.defaultResolver = this.currentRoute.data.subscribe(({deviceStatistic}) => {
            this.deviceStatistic = deviceStatistic;
        });
    }
    ngOnDestroy() {
        this.defaultResolver.unsubscribe();
    }
}
