export default class {
    constructor(conditions, actions, logicalOperators, initOptions = {}) {
        this.id = initOptions.id || '';
        this.conditions = conditions;
        this.actions = actions;
        this.actions[0].value = initOptions.actions
            && initOptions.actions.value
            || actions[0].values[0].id;
        this.name = initOptions.name || '';
        this.active = initOptions.active || false;
        this.logicalOperators = logicalOperators;
        this.logicalOperator = initOptions.logicalOperator || logicalOperators[0].id;
        this.jsCode = '';
        this.isConvertible = false;
        this.generatedJson = null;
        this.sourceType = '';
    }
}
