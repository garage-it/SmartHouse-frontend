import {ListService} from './list.service';
import {ListComponent} from './list.component';
import {Observable} from 'rxjs/Observable';

describe('ListComponent', () => {
    let listService;
    let listData;
    let listDataObserver;
    let listDataPromise;
    let sut;

    beforeEach(() => {
        listData = [
            {value: 'testValue1'},
            {value: 'testValue2'}
        ];

        listDataObserver = Observable.create(observer => {
            observer.next(listData);
            observer.complete();
        });

        listDataPromise = Promise.resolve(listData);

        listService = jasmine.createSpyObj('listService',
            Object.getOwnPropertyNames(ListService.prototype));
        listService.getObservableData.and.returnValue(listDataObserver);
        listService.getPromisedData.and.returnValue(listDataPromise);

        sut = new ListComponent(listService);
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should fetch observable list of data', () => {
            expect(listService.getObservableData).toHaveBeenCalledWith();

            expect(sut.asyncObservableList).toEqual(listDataObserver);
        });

        it('should resolve observable list of data', (done) => {
            expect(listService.getObservableData).toHaveBeenCalledWith();

            return listService.getObservableData().subscribe(() => {
                expect(sut.resolvedObservableList).toEqual(listData);
                done();
            });
        });

        it('should fetch promised list of data', () => {
            expect(listService.getPromisedData).toHaveBeenCalledWith();

            expect(sut.asyncPromiseList).toEqual(listDataPromise);
        });

        it('should resolve observable list of data', () => {
            expect(listService.getObservableData).toHaveBeenCalledWith();

            return listService.getPromisedData().then(() => {
                expect(sut.resolvedPromiseList).toEqual(listData);
            });
        });
    });
});
