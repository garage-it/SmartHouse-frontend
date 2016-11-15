import { EventEmitter } from '@angular/core';
import { Component, Output, Input } from '@angular/core';

import { Scenario } from '../scenario-entities/scenario';
import LOGICAL_OPERATORS from '../scenario-entities/logical-operators.const';

const template = require('./scenario-wizard.template.html');
const style = require('./scenario-wizard.style.scss');
const selector = 'scenario-wizard';

@Component({
    selector,
    template,
    styles: [style]
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
