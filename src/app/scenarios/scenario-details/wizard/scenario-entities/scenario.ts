const DEFAULT_SCENARIO_STATE = {
    active: false,
    isConvertable: false
};

export class Scenario {
    constructor(data = {}) {
        Object.assign(
            this,
            DEFAULT_SCENARIO_STATE,
            {
                wizard: {} // create empty wizard object if needed
            },
            data
        );
    }
}
