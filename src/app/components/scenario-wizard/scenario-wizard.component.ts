import {EventEmitter} from 'angular2/core';
import {Component} from 'angular2/core';
const template = require('./scenario-wizard.html');
const style = require('./scenario-wizard.scss');
const selector = 'scenario-wizard';

@Component({
    selector,
    template,
    styles: [style],
    inputs: ['scenario'],
    outputs: [
        'onAddCriteria',
        'onRemoveCriteria',
        'onAddAction',
        'onRemoveAction'
    ]
})

export class ScenarioWizardComponent {
    onAddCriteria: any;
    onRemoveCriteria: any;
    onAddAction: any;
    onRemoveAction: any;

    constructor() {
        this.onAddCriteria = new EventEmitter();
        this.onRemoveCriteria = new EventEmitter();
        this.onAddAction = new EventEmitter();
        this.onRemoveAction = new EventEmitter();
    }

    addCriteria() {
        this.onAddCriteria.next();
    }

    removeCriteria() {
        this.onRemoveCriteria.next();
    }

    addAction() {
        this.onAddAction.next();
    }

    removeAction() {
        this.onRemoveAction.next();
    }
}
