import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import template from './dashboard-editor.html';
import style from '../style.scss';
import DashboardService from '../dashboard.service';
import { SensorWidget } from '../sensor-widget';
import { SensorExecutorWidget } from '../sensor-executor-widget';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

const selector = 'dashboard-editor';

@Component({
    selector,
    template,
    styles: [style],
    providers: [DashboardService],
    directives: [ROUTER_DIRECTIVES, SensorWidget, SensorExecutorWidget, Dragula],
    viewProviders: [DragulaService]
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
        this.router.navigate(['/dashboard']);
    }
}
