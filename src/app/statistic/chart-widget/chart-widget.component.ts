import { Component, OnChanges, Input } from '@angular/core';
import { BaseChartComponent } from '../base-chart/base-chart.component';
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
export class ChartWidgetComponent extends BaseChartComponent implements OnChanges {
    options: Object;
    @Input() deviceStatistic;
    private modifiedDate;

    constructor(currentRoute: ActivatedRoute) {
        super(currentRoute);
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
