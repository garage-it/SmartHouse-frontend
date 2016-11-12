import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { DashboardService } from '../dashboard.service';

const selector = 'dashboard-editor';

@Component({
    selector,
    templateUrl: './dashboard-editor.template.html',
    styleUrls: ['../dashboard.style.scss']
})
export class DashboardEditorComponent {
    private widgets;
    private initialData;

    constructor(private dashboardService: DashboardService,
                private router: Router,
                private dragulaService: DragulaService) {
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

        this.dragulaService.setOptions(selector, {
            revertOnSpill: true,
            direction: 'horizontal'
        });
    }

    ngOnDestroy() {
        this.dragulaService.destroy(selector);
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
