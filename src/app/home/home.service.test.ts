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

    describe('get list of maps', () => {
        beforeEach(() => {
            httpMock.get.and.returnValue(Observable.create());
            sut.getMapList();
        });

        it('should get list of maps from the server', () => {
            expect(httpMock.get).toHaveBeenCalledWith('/map-view');
        });

        describe('on get list of maps error', () => {
            const error = Symbol('some server error');
            const errorMessage = Symbol('some error message');

            beforeEach(() => {
                httpMock.get.and.returnValue(Observable.throw(error));
                httpUtilsMock.extractErrorMessage.and.returnValue(Observable.throw(errorMessage));
                sut.getMapList().subscribe(successCb, failCb);
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
