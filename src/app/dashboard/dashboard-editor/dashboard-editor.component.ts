import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

const template = require('./dashboard-editor.template.html');
const style = require('../dashboard.style.scss');
import { DashboardService } from '../dashboard.service';

const selector = 'dashboard-editor';

@Component({
    selector,
    template,
    styles: [style],
    viewProviders: [DragulaService]
})
export class DashboardEditorComponent {
    private dashboardService;
    private router;
    private widgets;
    private initialData;

    constructor(dashboardService: DashboardService, router: Router) {
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
