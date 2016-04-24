import {DeviceList} from './deviceList.component';

describe('Device List', () => {
    describe('Sorting list of devices', () => {
        let sut;
        let listData;
        let DeviceListService;
        let numberArr;

        beforeEach(() => {
            numberArr = [];
            listData = [
                {
                    number: '1',
                    status: true
                },
                {
                    number: '2',
                    status: false
                },
                {
                    number: '3',
                    status: true
                }
            ];

            DeviceListService = jasmine.createSpyObj('DeviceListService', ['getData']);
            DeviceListService.getData.and.returnValue(Promise.resolve(listData));

            sut = new DeviceList(DeviceListService);
        });

        it('will call getData from service', () => {
            expect(DeviceListService.getData).toHaveBeenCalled();
        });

        it('will return correct data from service', (done) => {
            DeviceListService.getData().then((data) => {
                expect(sut.deviceList).toEqual(data);
                done();
            });
        });

        it('will sort by number column in  ascending order', (done) => {
            sut.sortBy = 'number';
            sut.reverse = true;


            DeviceListService.getData().then(() => {
                sut.setSortBy('number');
                sut.deviceList.forEach((elem) => {
                    numberArr.push(elem.number);
                });
                expect(numberArr).toEqual(['1', '2', '3']);
                done();
            });
        });

        it('will sort by number column in  descending order', (done) => {
            sut.sortBy = 'number';
            sut.reverse = false;

            DeviceListService.getData().then(() => {
                sut.setSortBy('number');
                sut.deviceList.forEach((elem) => {
                    numberArr.push(elem.number);
                });
                expect(numberArr).toEqual(['3', '2', '1']);
                done();
            });
        });

        it('will check active sort by column', () => {
            sut.sortBy = 'status';
            expect(sut.isActive('status')).toBe(true);
            expect(sut.isActive('number')).toBe(false);
        });

        it('will change sorting order to opposite on sorting by the same column', (done) => {
            sut.reverse = false;
            sut.sortBy = 'status';
            DeviceListService.getData().then(() => {
                sut.setSortBy('status');
                expect(sut.reverse).toBe(true);
                done();
            });
        });

        it('will change sorting order to ascending on sorting by different column', (done) => {
            sut.reverse = true;
            sut.sortBy = 'number';
            DeviceListService.getData().then(() => {
                sut.setSortBy('status');
                expect(sut.reverse).toBe(false);
                done();
            });
        });
    });
});
