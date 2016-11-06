import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DashboardService} from '../dashboard.service';

const template = require('./dashboard-sensor-details.template.html');
const style = require('../dashboard.style.scss');

const selector = 'dashboard-sensor-details';

@Component({
    selector,
    template,
    styles: [style]
})
export class DashboardSensorDetailsComponent {
    private defaultResolver;
    private deviceStatistic;
    private params;

    constructor(private router: Router,
                private currentRoute: ActivatedRoute,
                private dashboardService: DashboardService) {
        this.deviceStatistic = [];
    }

    ngOnInit() {
        // this.params = this.currentRoute.snapshot.params['id'];

        this.defaultResolver = this.currentRoute.data.subscribe(({deviceStatistic}) => {
            this.deviceStatistic = deviceStatistic;
        });
    }
    ngOnDestroy() {
        this.defaultResolver.unsubscribe();
    }

    exitEditMode() {
        this.router.navigate(['/dashboard']);
    }

    getStatistic(period:string = 'day') {
        this.params = this.currentRoute.snapshot.params['id'];

        this.dashboardService
            .getStatistic(this.params, period)
            .subscribe((data) => {
                this.deviceStatistic = data;
            })
        ;
    }
}
