import { Component, Input } from '@angular/core';

const template = require('./chart-widget.template.html');
const styles = require('./chart-widget.styles.scss');

@Component({
    selector: 'sm-chart-widget',
    template: template,
    styles: [styles]
})
export class SimpleChartWidgetComponent {
    @Input() deviceStatistic;
    options: Object;

    private pipeDate(date) {
        return (new Date(date)).toLocaleString();
    }

    ngOnInit(): void {
        this.options = {
            chart: { type: 'spline' },
            title: { text : `Statistic for ${this.deviceStatistic.sensor}  sensor`},
            xAxis: [{
                labels: {
                    format: `{value}`,
                },
                categories: this.deviceStatistic.data
                    .map(item => item.date)
                    .map(this.pipeDate),
                crosshair: true
            }],
            yAxis: [{
                labels: {
                    format: '{value}°C',
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
