import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import ChartPeriod from '../chart-widget/chart-period.enum';
const template = require('./sensor-statistic.template.html');
const style = require('./sensor-statistic.styles.scss');

const selector = 'sh-sensor-statistic';

@Component({
    selector,
    template,
    styles: [style]
})
export class SensorStatisticComponent implements OnInit, OnDestroy {
    private defaultResolver;
    private deviceStatistic;
    private sensorId;
    private periods;

    constructor(private currentRoute: ActivatedRoute) {
        this.deviceStatistic = [];
        this.periods = [];
    }

    ngOnInit() {
        this.periods = [
            ChartPeriod[ChartPeriod['day']],
            ChartPeriod[ChartPeriod['week']],
            ChartPeriod[ChartPeriod['month']],
            ChartPeriod[ChartPeriod['year']]
        ];

        this.sensorId = this.currentRoute.snapshot.params['id'];

        this.defaultResolver = this.currentRoute.data.subscribe(({deviceStatistic}) => {
            this.deviceStatistic = deviceStatistic;
        });
    }

    ngOnDestroy() {
        this.defaultResolver.unsubscribe();
    }
}
