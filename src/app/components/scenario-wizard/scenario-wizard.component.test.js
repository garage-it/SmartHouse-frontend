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
});
