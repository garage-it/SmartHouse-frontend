import { Observable } from 'rxjs/Rx';
import { ViewResolveService } from './view-resolve.service';

describe('ViewResolveService', () => {
    let sut;
    let HomeService;
    let ToastsManager;
    let route;

    beforeEach(() => {
        HomeService = {
            getView: jasmine.createSpy('getView')
        };
        ToastsManager = {
            error: jasmine.createSpy('error')
        };
        route = {params: {id: Math.random()}};

        sut = new ViewResolveService(HomeService, ToastsManager);
    });

    it('should resolve view by id', () => {
        HomeService.getView.and.returnValue(Observable.create());
        sut.resolve(route);
        expect(HomeService.getView).toHaveBeenCalledWith(route.params.id);
    });

    describe('when resolve gets error', () => {
        const error = 'Fake error';
        let successCb;
        let failCb;

        beforeEach(() => {
            successCb = jasmine.createSpy('successCb');
            failCb = jasmine.createSpy('failCb');
            HomeService.getView.and.returnValue(Observable.throw(error));
            sut.resolve(route).subscribe(successCb, failCb);
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
