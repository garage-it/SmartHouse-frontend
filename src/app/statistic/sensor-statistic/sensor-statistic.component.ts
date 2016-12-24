import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwitcherStatisticsService } from './switcher-statistic.service';

const CHART_PERIODS: Array<string> = [
    'hour',
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
    private deviceStatistic = [];
    private pieChartStatistic = {data: []};
    private sensorId;
    private type;

    constructor(private currentRoute: ActivatedRoute,
                private switcherStatisticsService: SwitcherStatisticsService) {
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

    dateRangeChanged(dateRange) {
        this.switcherStatisticsService.getPieChartData(this.sensorId, dateRange)
            .then((pieChartStatistic) => this.pieChartStatistic = pieChartStatistic);
    }
}
