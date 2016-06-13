import {ScenarioWizardComponent} from './scenario-wizard.component';

describe('ScenarioWizardComponent', () => {
    let sut;

    beforeEach(() => {
        sut = new ScenarioWizardComponent();

        spyOn(sut.onAddCriteria, 'next');
        spyOn(sut.onRemoveCriteria, 'next');
        spyOn(sut.onAddAction, 'next');
        spyOn(sut.onRemoveAction, 'next');
    });

    it('should emit event when criteria is added', () => {
        sut.addCriteria();
        expect(sut.onAddCriteria.next).toHaveBeenCalled();
    });

    it('should emit event when criteria is removed', () => {
        sut.removeCriteria();
        expect(sut.onRemoveCriteria.next).toHaveBeenCalled();
    });

    it('should emit event when action is added', () => {
        sut.addAction();
        expect(sut.onAddAction.next).toHaveBeenCalled();
    });

    it('should emit event when action is removed', () => {
        sut.removeAction();
        expect(sut.onRemoveAction.next).toHaveBeenCalled();
    });

    it('should show remove-button if there are more than 1 actions', () => {
        sut.scenario = {actions: [1, 2]};
        expect(sut.removeActionBtnVisible()).toEqual(true);
    });

    it('should hide remove-button if there is 1 action', () => {
        sut.scenario = {actions: [1]};
        expect(sut.removeActionBtnVisible()).toEqual(false);
    });

    it('should show remove btn if there are more than 1 action', () => {
        sut.scenario = {
            actions: [1, 2]
        };
        expect(sut.removeActionBtnVisible()).toEqual(true);
    });

    it('should NOT show remove btn if there is only one action', () => {
        sut.scenario = {
            actions: [1]
        };
        expect(sut.removeActionBtnVisible()).toEqual(false);
    });
});
