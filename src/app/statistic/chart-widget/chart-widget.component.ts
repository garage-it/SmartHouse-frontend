import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const measurementUnit = {
    'distance': 'm',
    'humidity': '%',
    'temperature': '°C'
};
const dateLabels = {
    'day': '{value:%H}',
    'week': '{value:%a}',
    'month': '{value:%d}',
    'year': '{value:%b}'
};
const dateTitles = {
    'day': 'hours',
    'week': 'days',
    'month': 'dates',
    'year': 'months'
};

@Component({
    selector: 'sh-chart-widget',
    templateUrl: './chart-widget.template.html',
    styleUrls: ['./chart-widget.styles.scss']
})
export class ChartWidgetComponent implements OnInit, OnChanges, OnDestroy {
    @Input() deviceStatistic;
    options: Object;
    private periodSubscription;
    private deviceId;
    private period;
    private modifiedDate;

    constructor(private currentRoute: ActivatedRoute) {
        this.deviceId = this.currentRoute.snapshot.params['id'];
        this.period = this.currentRoute.snapshot.params['period'];
    }

    ngOnInit(): void {
        this.periodSubscription = this.currentRoute.params.subscribe(params => {
            this.period = params['period'];
        });
    }

    ngOnDestroy(): void {
        this.periodSubscription.unsubscribe();
    }

    ngOnChanges() {
        this.modifiedDate = this.deviceStatistic.data.map(item => (+(new Date(item.date))));
        this.options = {
            chart: { type: 'spline' },
            title: { text : `Statistic for ${this.deviceStatistic.sensor}  sensor`},
            xAxis: {
                type: 'datetime',
                labels: {
                    rotation: -45,
                    format: dateLabels[this.period]
                },
                title: {
                    text: dateTitles[this.period]
                },
                categories: this.modifiedDate
            },
            yAxis: [{
                labels: {
                    format: `{value}${measurementUnit[this.deviceId]}`,
                },
                title: {
                    text: `${this.deviceStatistic.sensor}`
                }
            }],
            series: [{
                name: `Statistics for the ${this.period}`,
                data: this.deviceStatistic.data.map(item => item.value)
            }]
        };
    }
}
