import { Observable } from 'rxjs/Rx';
import { HomeResolveService } from './home-resolve.service';

describe('HomeResolveService', () => {
    let sut;
    let HomeService;
    let ToastsManager;

    beforeEach(() => {
        HomeService = {
            getViewList: jasmine.createSpy('getViewList')
        };
        ToastsManager = {
            error: jasmine.createSpy('error')
        };
        sut = new HomeResolveService(HomeService, ToastsManager);
    });

    it('should resolve list of maps for home page', () => {
        HomeService.getViewList.and.returnValue(Observable.create());
        sut.resolve();
        expect(HomeService.getViewList).toHaveBeenCalled();
    });

    describe('when resolve gets error', () => {
        const error = 'Fake error';
        let successCb;
        let failCb;

        beforeEach(() => {
            successCb = jasmine.createSpy('successCb');
            failCb = jasmine.createSpy('failCb');
            HomeService.getViewList.and.returnValue(Observable.throw(error));
            sut.resolve().subscribe(successCb, failCb);
        });

        it('should show error', () => {
            expect(ToastsManager.error).toHaveBeenCalledWith(error);
        });

        it('should not emit any values', () => {
            expect(successCb).not.toHaveBeenCalled();
        });

        it('should not emit any errors outside', () => {
            expect(failCb).not.toHaveBeenCalled();
        });
    });
});
