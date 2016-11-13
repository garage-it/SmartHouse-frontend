import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const template = require('./chart-widget.template.html');
const styles = require('./chart-widget.styles.scss');

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

@Component({
    selector: 'sm-chart-widget',
    template: template,
    styles: [styles]
})
export class ChartWidgetComponent {
    @Input() deviceStatistic;
    options: Object;
    private periodSubscription;
    private deviceId;
    private period;

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
        this.options = {
            chart: { type: 'spline' },
            title: { text : `Statistic for ${this.deviceStatistic.sensor}  sensor`},
            xAxis: {
                type: 'datetime',
                labels: {
                    rotation: -45,
                    format: dateLabels[this.period]
                },
                categories: this.deviceStatistic.data.map(item => (new Date(item.date)))
            },
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
