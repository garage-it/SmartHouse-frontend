import {ListComponent} from './list.component';

describe('ListComponent', () => {
    let listService;
    let listData;
    let sut;

    beforeEach(() => {
        listData = [
            {value: 'testValue1'},
            {value: 'testValue2'}
        ];

        listService = jasmine.createSpyObj('listService', ['getData']);
        listService.getData.and.returnValue(Promise.resolve(listData));

        sut = new ListComponent(listService);
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            sut.ngOnInit();
        });

        it('should fetch list of data', (done) => {
            expect(listService.getData).toHaveBeenCalledWith();

            listService.getData().then(() => {
                expect(sut.list).toEqual(listData);
                done();
            });
        });
    });
});
