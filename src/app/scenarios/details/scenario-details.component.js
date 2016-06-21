import {Component, ViewChild} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';

import template from './scenario-details.html';
import style from './scenario-details.scss';
import {ScenarioService} from '../shared/Scenario.service.js';

// SUBCOMPONENTS {{{
import {ScenarioEditor} from './editor/scenario-editor.component.js';
import {ScenarioWizardMegaComponent} from './wizard/scenario-wizard-mega.component.js';
// }}}

@Component({
    selector: 'scenario-details',
    template,
    styles: [style],
    providers: [ScenarioService],
    directives: [ScenarioEditor, ScenarioWizardMegaComponent, RouterLink]
})

export class ScenarioDetailsComponent {
    @ViewChild('wizard') wizardComponent;
    @ViewChild('editor') editorComponent;

    constructor(scenarioService:ScenarioService, routeParams:RouteParams, router: Router) {
        this._scenarioService = scenarioService;
        this._routeParams = routeParams;
        this._router = router;
        // TODO: remove 
        this.scenario = {};
        this.visibility = {
            wizard: false,
            script: true
        };
    }

    ngOnInit(){
        let scriptId = this._routeParams.get('id');
        // TODO: refactor poor man's check for CreateMode
        this.createMode = scriptId === null;

        if (this.createMode){
            return;
        }

        const scenarioStream = this._scenarioService.get(this._routeParams.get('id'));

        scenarioStream.subscribe(scenario => {
            this.scenario = scenario;
        });
    }

    onScenarioBodyUpdate(event) {
        this.scenario.body = event.body;
        this.wizardInvalidated = true;
    }

    onScenarioWizardUpdate(event) {
        this.scenario.wizard = event.wizard;
        this.scriptInvalidated = true;
    }

    switchToWizard(){
        this.visibility.wizard = true;
        this.visibility.script = false;
    }

    switchToScript(){
        this.visibility.script = true;
        this.visibility.wizard = false;
    }

    back() {
        this._router.navigate(['/ScenarioList']);
    }

    save(scenario) {
        let result = Object.assign({}, scenario);
        if (this.visibility.script) {
            result.wizard = null;
            result.body = this.editorComponent.getRaw();
        } else {
            result.body = null;
            result.wizard = this.wizardComponent.getRaw();
        }

        let savePromise;
        if (this.createMode){
            savePromise = this._scenarioService
                .create(result);
        } else {
            savePromise = this._scenarioService
                .update(result);
        }

        savePromise.subscribe(()=>this.back());

    }
}
