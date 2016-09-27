import { ScenarioDetailsComponent } from './scenario-details.component';

describe('ScenarioDetailsComponent', () => {
    let sut;
    let router;

    beforeEach(() => {
        router = {
            navigate: jasmine.createSpy('navigate')
        };

        sut = new ScenarioDetailsComponent(null, null, router);
    });

    describe('Back', () => {
        it('should go to list of scenarios', () => {
            sut.back();

            expect(router.navigate).toHaveBeenCalledWith(['/scenarios']);
        });
    });
});
