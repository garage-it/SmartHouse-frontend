import { BaseChartComponent } from '../../base-chart/base-chart.component';
import { Component, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sh-servo-statistic-column-chart',
    templateUrl: 'servo-column-chart.template.html'
})
export class ServoColumnChartComponent extends BaseChartComponent implements OnChanges {
    options: Object;
    @Input() deviceStatistic; // TODO: Add this to abstract class

    constructor(currentRoute: ActivatedRoute) {
        super(currentRoute);
    }

    ngOnChanges() {
        this.options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: this.deviceStatistic.data.map(item => item.name)
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    }
                }
            },
            series: [{
                name: `Statistics for the ${this.period}`,
                data: this.deviceStatistic.data.map(item => item.value)
            }]
        };
    }
}
