import { Component, Input } from '@angular/core';

const template = require('./simple-chart-widget.template.html');
const styles = require('./simple-chart-widget.styles.scss');

@Component({
    selector: 'simple-chart-widget',
    template: template,
    styles: [styles]
})
export class SimpleChartWidgetComponent {
    @Input() deviceStatistic;
    options: Object;

    constructor() {}

    ngOnInit():void {
        this.options = {
            chart: { type: 'spline' },
            title: { text : `Statistic for ${this.deviceStatistic.sensor}  sensor`},
            xAxis: [{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
