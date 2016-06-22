import {Component} from 'angular2/core';
import {Router, RouterLink} from 'angular2/router';

import template from './dashboard-editor.html';
import style from '../style.scss';
import DashboardService from '../dashboard.service';
import { SensorWidget } from '../../components/sensor-widget';
import { SensorExecutorWidget } from '../../components/sensor-executor-widget';

const selector = 'dashboard-editor';

@Component({
    selector,
    template,
    styles: [style],
    providers: [DashboardService],
    directives: [SensorWidget, SensorExecutorWidget, RouterLink]
})

export class DashboardEditor {
    constructor(dashboardService:DashboardService, router: Router) {
        this.dashboardService = dashboardService;
        this.router = router;
        this.widgets = [];
        this.initialData = [];
    }

    ngOnInit() {
        this.dashboardService
            .getWidgets()
            .subscribe(({devices}) => {
                this.widgets = devices;
                this.setInitialData(devices);
            });
    }

    applyChanges() {
        this.dashboardService
            .applyChanges(this.widgets)
            .subscribe(() => this.exitEditMode());
    }

    isApplyDisabled() {
        return this.dashboardService.compareWidgetsLists(this.initialData, this.widgets);
    }

    setInitialData(widgets) {
        this.initialData = widgets.map((widget) => Object.assign({}, widget));
    }

    exitEditMode() {
        this.router.navigate(['Dashboard']);
    }
}
