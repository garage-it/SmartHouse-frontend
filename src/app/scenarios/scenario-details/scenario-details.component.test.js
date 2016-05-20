import {ScenarioDetailsComponent} from './scenario-details.component';
import {Router} from 'angular2/router';

describe('ScenarioDetailsComponent', () => {
    let sut;
    let router;

    beforeEach(() => {
        router = jasmine.createSpyComponent(Router);

        sut = new ScenarioDetailsComponent(null, null, router);
    });

    describe('Back', () => {
        it('should go to list of scenarios', () => {
            sut.back();

            expect(router.navigate).toHaveBeenCalledWith(['/ScenarioList']);
        });
    });
});
