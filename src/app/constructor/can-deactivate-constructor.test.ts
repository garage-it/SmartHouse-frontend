import { CanDeactivateConstructor } from './can-deactivate-constructor';

describe('constructor routing deactivate hook', () => {

    let sut;
    let dialogService;

    beforeEach(() => {
        dialogService = {
            confirm: jasmine.createSpy('confirm')
        };
        sut = new CanDeactivateConstructor(dialogService);
    });

    describe('on deactivate', () => {
        const confirmResult = Symbol('confirm result');
        let result;

        beforeEach(() => {
            dialogService.confirm.and.returnValue(confirmResult);
            result = sut.canDeactivate();
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
