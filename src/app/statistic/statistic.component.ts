import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sh-statistic',
    templateUrl: './statistic.template.html',
    styleUrls: ['./statistic.style.scss']
})
export class StatisticComponent implements OnInit {
    private deviceList = [];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.deviceList = data['deviceList'];
        });
    }
}
