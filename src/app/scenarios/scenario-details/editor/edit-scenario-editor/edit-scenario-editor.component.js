import { ActivatedRoute, Router } from '@angular/router';

import { ScenarioDetailsComponent } from '../../scenario-details.component';
import { ScenarioService } from '../../../shared/scenario.service.js';

export class EditScenarioEditorComponent extends ScenarioDetailsComponent {

    constructor(scenarioListService:ScenarioService, route:ActivatedRoute, router: Router) {// eslint-disable-line
        super(scenarioListService, route, router);
    }

    ngOnInit() {
        this._scenarioService.get(this._route.snapshot.params.id)
            .subscribe((scenario) => {
                this.scenario = scenario;
            });
    }

    save(scenario) {
        this._scenarioService.update(scenario)
            .subscribe(() => {
                this.back();
            });
    }

    delete(scenario) {
        this._scenarioService
            .delete(scenario)
            .subscribe(() => {
                this.back();
            });
    }

    isWizardAvailable() {
        return false;
    }
}
