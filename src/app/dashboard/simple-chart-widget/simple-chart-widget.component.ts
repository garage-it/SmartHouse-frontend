import { Component } from '@angular/core';

const template = require('./simple-chart-widget.template.html');

@Component({
    selector: 'simple-chart-widget',
    template: template
})
export class SimpleChartWidgetComponent {

    chart: Object;
    options: Object;
    saveInstance(chartInstance) {
        this.chart = chartInstance;
    }

    constructor() {
        this.options = {
          chart: { type: 'spline' },
          title: { text : 'dynamic data example'},
          series: [{name: 'vasya',  data: [2, 3, 5, 8, 13] }]
        };
        setInterval(() => this.chart.series[0].addPoint(Math.random() * 15), 1000);
    }
}
