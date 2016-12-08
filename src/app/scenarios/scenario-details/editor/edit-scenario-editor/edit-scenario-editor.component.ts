import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ScenarioDetailsComponent } from '../../scenario-details.component';
import { ScenarioService } from '../../../shared/scenario.service';
import { DialogService } from '../../../../shared/dialog/dialog.service';

@Component({
    selector: 'sh-scenario-list',
    templateUrl: '../../scenario-details.template.html',
    styleUrls: ['../../scenario-details.style.scss']
})
export class EditScenarioEditorComponent extends ScenarioDetailsComponent implements OnInit {

    constructor(protected scenarioListService: ScenarioService,
                protected router: Router,
                protected route: ActivatedRoute,
                protected dialogService: DialogService,
                protected viewContainerRef: ViewContainerRef) {
        super(scenarioListService, route, router);
    }

    public ngOnInit(): void {
        this._scenarioService.get(this._route.snapshot.params['id'])
            .subscribe((scenario) => {
                this.scenario = scenario;
            });
    }

    public save(scenario): void {
        this._scenarioService.update(scenario)
            .subscribe(() => {
                this.back();
            });
    }

    public delete(scenario): void {
        const confirmOptions = {
            title: '',
            message: 'Are you sure you want to delete this scenario?'
        };

        this.dialogService.confirm(this.viewContainerRef, confirmOptions)
            .filter(isConfirmed => isConfirmed)
            .subscribe(() => {
                this._scenarioService
                    .delete(scenario)
                    .subscribe(() => {
                        this.back();
                    });
            });
    }

    public isWizardAvailable(): boolean {
        return false;
    }
}
