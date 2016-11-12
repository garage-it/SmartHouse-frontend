import { EventEmitter } from '@angular/core';
import { Component, Output, Input } from '@angular/core';

import { Scenario } from '../scenario-entities/scenario';

import LOGICAL_OPERATORS from '../scenario-entities/logical-operators.const';

@Component({
    selector: 'scenario-wizard',
    templateUrl: './scenario-wizard.template.html',
    styleUrls: ['./scenario-wizard.style.scss']
})
export class ScenarioWizardComponent {

    @Input() scenario: Scenario;

    @Output() onAddCriteria: EventEmitter<any>;
    @Output() onRemoveCriteria: EventEmitter<any>;
    @Output() onAddAction: EventEmitter<any>;
    @Output() onRemoveAction: EventEmitter<any>;

    private LOGICAL_OPERATORS;

    constructor() {
        this.onAddCriteria = new EventEmitter();
        this.onRemoveCriteria = new EventEmitter();
        this.onAddAction = new EventEmitter();
        this.onRemoveAction = new EventEmitter();

        this.LOGICAL_OPERATORS = LOGICAL_OPERATORS;
    }

    addCriteria() {
        this.onAddCriteria.next();
    }

    removeCriteria(index) {
        this.onRemoveCriteria.emit(index);
    }

    addAction() {
        this.onAddAction.next();
    }

    removeAction(index) {
        this.onRemoveAction.emit(index);
    }

    removeActionBtnVisible() {
        return this.scenario['wizard']['actions'].length > 1;
    }
}
