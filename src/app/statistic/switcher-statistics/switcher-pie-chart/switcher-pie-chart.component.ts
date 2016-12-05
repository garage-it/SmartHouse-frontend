import { BaseChartComponent } from '../../base-chart/base-chart.component';
import { Component, OnChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sh-switcher-statistic-pie-chart',
    templateUrl: 'switcher-pie-chart.template.html',
    styleUrls: ['./switcher-pie-chart.styles.scss']
})
export class SwitcherPieChartComponent extends BaseChartComponent implements OnChanges {
    options: Object;
    @Input() deviceStatistic;

    constructor(currentRoute: ActivatedRoute) {
        super(currentRoute);
    }

    ngOnChanges() {
        this.options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'COMPONENT FAILURE'
            },
            tooltip: {
                pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                data: this.deviceStatistic.data.map(item => {
                    return {
                        name: item.name,
                        y: item.value
                    };
                })
            }]
        };
    }
}
