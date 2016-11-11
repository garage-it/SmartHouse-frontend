import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import CHART_PERIOD from '../chart-widget/chart-period.const';
const template = require('./sensor-statistic.template.html');
const style = require('../dashboard.style.scss');

const selector = 'sensor-statistic';

@Component({
    selector,
    template,
    styles: [style]
})
export class SensorStatisticComponent {
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
