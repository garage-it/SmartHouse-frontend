export default class {
    constructor(conditions, actions, logicalOperators) {
        this.conditions = conditions;
        this.actions = actions;
        this.description = '';
        this.active = false;
        this.logicalOperators = logicalOperators;
        this.selectedOperator = logicalOperators[0].id;
    }
}
