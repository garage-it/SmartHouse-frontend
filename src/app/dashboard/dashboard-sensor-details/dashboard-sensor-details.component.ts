import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import CHART_PERIOD from '../chart-widget/chart-period.const';
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
    private periods;

    constructor(private currentRoute: ActivatedRoute) {
        this.deviceStatistic = [];
        this.periods = [];
    }

    ngOnInit() {
        Object.keys(CHART_PERIOD).forEach(key => {
            this.periods.push(CHART_PERIOD[key]);
        });

        this.sensorId = this.currentRoute.snapshot.params['id'];

        this.defaultResolver = this.currentRoute.data.subscribe(({deviceStatistic}) => {
            this.deviceStatistic = deviceStatistic;
        });
    }
    ngOnDestroy() {
        this.defaultResolver.unsubscribe();
    }
}
