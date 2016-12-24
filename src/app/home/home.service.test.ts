import { HomeService } from './home.service';
import { Observable } from 'rxjs/Observable';

describe('HomeService', () => {
    let httpMock;
    let httpUtilsMock;
    let successCb;
    let failCb;
    let sut;

    beforeEach(() => {
        successCb = jasmine.createSpy('successCb');
        failCb = jasmine.createSpy('failCb');
        httpUtilsMock = {
            extractErrorMessage: jasmine.createSpy('extractErrorMessage')
        };
        httpMock = jasmine.createSpyObj('mock http', ['get']);

        sut = new HomeService(httpMock, httpUtilsMock);
    });

    describe('get list of views', () => {
        beforeEach(() => {
            httpMock.get.and.returnValue(Observable.create());
            sut.getViewList();
        });

        it('should get list of views from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/views');
        });

        describe('on get list of views error', () => {
            const error = Symbol('some server error');
            const errorMessage = Symbol('some error message');

            beforeEach(() => {
                httpMock.get.and.returnValue(Observable.throw(error));
                httpUtilsMock.extractErrorMessage.and.returnValue(Observable.throw(errorMessage));
                sut.getViewList().subscribe(successCb, failCb);
            });

            it('should extract error message', () => {
                expect(httpUtilsMock.extractErrorMessage).toHaveBeenCalledWith(error);
            });

            it('should delegate error handling outside', () => {
                expect(failCb).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    describe('get view by id', () => {
        const viewId = '1234';

        beforeEach(() => {
            httpMock.get.and.returnValue(Observable.create());
            sut.getView(viewId);
        });

        it('should get view by id from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith(`/views/${viewId}`);
        });

        describe('on get view error', () => {
            const error = Symbol('some server error');
            const errorMessage = Symbol('some error message');

            beforeEach(() => {
                httpMock.get.and.returnValue(Observable.throw(error));
                httpUtilsMock.extractErrorMessage.and.returnValue(Observable.throw(errorMessage));
                sut.getView(viewId).subscribe(successCb, failCb);
            });

            it('should extract error message', () => {
                expect(httpUtilsMock.extractErrorMessage).toHaveBeenCalledWith(error);
            });

            it('should delegate error handling outside', () => {
                expect(failCb).toHaveBeenCalledWith(errorMessage);
            });
        });
    });
});
