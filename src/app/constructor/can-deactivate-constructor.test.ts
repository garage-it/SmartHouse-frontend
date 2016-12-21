import { CanDeactivateConstructor } from './can-deactivate-constructor';
import { Observable } from 'rxjs';

describe('constructor routing deactivate hook', () => {

    let sut;
    let dialogService;
    const confirmResult = Symbol('confirm result');

    beforeEach(() => {
        dialogService = {
            confirm: jasmine.createSpy('confirm').and.returnValue(confirmResult)
        };

        sut = new CanDeactivateConstructor(dialogService);
    });

    describe('on deactivate', () => {
        let target = {
            isSave: false
        };
        let result;

        describe('when constructor is saved', () => {
            beforeEach(() => {
                target.isSave = true;
                result = sut.canDeactivate(target);
            });

            it('should not open confirm dialog', () => {
                expect(dialogService.confirm).not.toHaveBeenCalled();
            });

            it('should return observable true for can deactivate', () => {
                expect(result).toEqual(Observable.of(target.isSave));
            });
        });

        describe('when constructor is not saved', () => {
            beforeEach(() => {
                target.isSave = false;
                result = sut.canDeactivate(target);
            });

            it('should open confirm dialog', () => {
                expect(dialogService.confirm).toHaveBeenCalledWith(null, {
                    title: '',
                    message: 'Do you want to exit without saving?',
                    ok: 'Yes',
                    cancel: 'No'
                });
            });

            it('should return confirm result', () => {
                expect(result).toBe(confirmResult);
            });
        });


    });

});
