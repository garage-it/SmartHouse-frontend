import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const CHART_PERIODS: Array<string> = [
    'day',
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
    private type;

    constructor(private currentRoute: ActivatedRoute) {
        this.deviceStatistic = [];
    }

    get periods(): Array<string> {
        return CHART_PERIODS;
    }

    ngOnInit() {
        this.sensorId = this.currentRoute.snapshot.params['id'];
        this.type = this.currentRoute.snapshot.params['type'];

        this.defaultResolver = this.currentRoute.data.subscribe(({deviceStatistic}) => {
            this.deviceStatistic = deviceStatistic;
        });
    }

    ngOnDestroy() {
        this.defaultResolver.unsubscribe();
    }

    isSwitcherWidgetVisible() {
        return this.type === 'switcher';
    }

    isChartWidgetVisible() {
        return this.type !== 'switcher';
    }
}
