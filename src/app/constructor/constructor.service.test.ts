import { ConstructorService } from './constructor.service';

describe('ConstructorService', () => {
    const response = {};

    let sut;
    let http;
    let result;
    let DialogService;
    const confirmResult = Symbol('confirmResult');

    beforeEach(() => {
        DialogService = {
            confirm: jasmine.createSpy('confirm').and.returnValue(confirmResult)
        };

        http = {
            post: jasmine.createSpy('post').and.returnValue(response)
        };

        sut = new ConstructorService(http, DialogService);
    });

    describe('create', () => {

        const viewInfoDto = {};

        beforeEach(() => {
            result = sut.createOrUpdate(viewInfoDto);
        });

        it('should make request to create view', () => {
            expect(http.post).toHaveBeenCalledWith('/views', viewInfoDto);
        });

        it('should return response', () => {
            expect(result).toEqual(response);
        });

    });
    
    describe('confirm', () => {
        beforeEach(() => {
            result = sut.confirm();
        });

        it('should open confirm dialog', () => {
            expect(DialogService.confirm).toHaveBeenCalledWith(null, {
                title: '',
                message: 'Do you want to save and exit?',
                ok: 'Yes',
                cancel: 'No'
            });
        });

        it('should return confirm result', () => {
            expect(result).toBe(confirmResult);
        });
    });
});
