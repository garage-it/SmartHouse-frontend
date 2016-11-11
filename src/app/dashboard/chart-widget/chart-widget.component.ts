import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const template = require('./chart-widget.template.html');
const styles = require('./chart-widget.styles.scss');

const measurementUnit = {
    'distance': 'm',
    'humidity': '%',
    'temperature': '°C'
};

const timePeriodUnit = {
    'day': 'getHours',
    'week': 'getDay',
    'month': 'getDate',
    'year': 'getMonth'
};

@Component({
    selector: 'sm-chart-widget',
    template: template,
    styles: [styles]
})
export class SimpleChartWidgetComponent {
    @Input() deviceStatistic;
    options: Object;
    private periodSubscription;
    private deviceId;
    private period;

    constructor(private currentRoute: ActivatedRoute) {
        this.deviceId = this.currentRoute.snapshot.params['id'];
        this.period = this.currentRoute.snapshot.params['period'];
    }

    private pipeDate(date) {
        return (new Date(date))[timePeriodUnit[this.period]]();
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
        this.options = {
            chart: { type: 'spline' },
            title: { text : `Statistic for ${this.deviceStatistic.sensor}  sensor`},
            xAxis: [{
                labels: {
                    format: `{value}`,
                },
                categories: this.deviceStatistic.data
                    .map(({date}) => this.pipeDate(date)),
                crosshair: true
            }],
            yAxis: [{
                labels: {
                    format: `{value}${measurementUnit[this.deviceId]}`,
                },
                title: {
                    text: `${this.deviceStatistic.sensor}`,
                }
            }],
            series: [{
                name: `${this.deviceStatistic.sensor}`,
                data: this.deviceStatistic.data.map(item => item.value)
            }]
        };
    }
}
