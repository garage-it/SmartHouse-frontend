import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const CHART_PERIODS: Array<string> = [
    'day',
    'week',
    'month',
    'year'
];

@Component({
    selector: 'sh-sensor-statistic',
    templateUrl: './sensor-statistic.template.html',
    styleUrls: ['./sensor-statistic.styles.scss']
})
export class SensorStatisticComponent implements OnInit, OnDestroy {
    private defaultResolver;
    private deviceStatistic;
    private sensorId;

    constructor(private currentRoute: ActivatedRoute) {
        this.deviceStatistic = [];
    }

    get periods(): Array<string> {
        return CHART_PERIODS;
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

    isSwitcherWidgetVisible() {
        return this.sensorId === 'switcher';
    }

    isChartWidgetVisible() {
        return this.sensorId !== 'switcher';
    }
}
